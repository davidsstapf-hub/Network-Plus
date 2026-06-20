import test from 'node:test'
import assert from 'node:assert/strict'
import { calculateSubnet, checkSubnetPracticeAnswers, generateSubnetPracticeBank, generateSubnetPrompt, hostsToPrefix, maskToPrefix, octetToBinary } from '../../src/lib/subnetting.js'

test('subnet calculator returns standard /26 boundaries and binary', () => {
  const result = calculateSubnet('192.168.14.77', 26)
  assert.equal(result.subnetMask, '255.255.255.192')
  assert.equal(result.networkAddress, '192.168.14.64')
  assert.equal(result.broadcastAddress, '192.168.14.127')
  assert.equal(result.firstUsable, '192.168.14.65')
  assert.equal(result.lastUsable, '192.168.14.126')
  assert.equal(result.usableHosts, 62)
  assert.equal(result.binaryAddress, '11000000.10101000.00001110.01001101')
})

test('subnet calculator handles small point-to-point style prefixes conservatively', () => {
  const result = calculateSubnet('10.10.10.10', 30)
  assert.equal(result.subnetMask, '255.255.255.252')
  assert.equal(result.networkAddress, '10.10.10.8')
  assert.equal(result.broadcastAddress, '10.10.10.11')
  assert.equal(result.firstUsable, '10.10.10.9')
  assert.equal(result.lastUsable, '10.10.10.10')
  assert.equal(result.usableHosts, 2)
})

test('binary helpers and generated practice prompts are deterministic', () => {
  assert.equal(octetToBinary(192), '11000000')
  assert.equal(octetToBinary(26), '00011010')
  assert.equal(maskToPrefix('255.255.255.192'), 26)
  assert.equal(hostsToPrefix(50), 26)
  const prompt = generateSubnetPrompt(6)
  assert.equal(prompt.type, 'classic')
  assert.equal(prompt.address, '10.4.4.236')
  assert.equal(prompt.prefix, 16)
  assert.equal(prompt.answer.networkAddress, '10.4.0.0')
})

test('practice bank provides hundreds of mixed checkable subnet drills', () => {
  const bank = generateSubnetPracticeBank(360)
  assert.equal(bank.length, 360)
  assert.equal(new Set(bank.map((prompt) => prompt.id)).size, 360)
  assert.deepEqual([...new Set(bank.map((prompt) => prompt.type))].sort(), ['binary','cidr-to-mask','classic','host-sizing','mask-to-cidr','vlsm'])
  const first = bank[0]
  assert.deepEqual(checkSubnetPracticeAnswers({
    networkAddress: first.answer.networkAddress,
    broadcastAddress: first.answer.broadcastAddress,
    wildcardMask: first.answer.wildcardMask,
    usableHosts: String(first.answer.usableHosts),
  }, first), {
    networkAddress: true,
    broadcastAddress: true,
    wildcardMask: true,
    usableHosts: true,
  })
  const binary = bank.find((prompt) => prompt.type === 'binary')
  assert.deepEqual(checkSubnetPracticeAnswers({ binaryOctet: binary.answer.binaryOctet }, binary), { binaryOctet: true })
  const hosts = bank.find((prompt) => prompt.type === 'host-sizing')
  assert.equal(checkSubnetPracticeAnswers({ cidr: hosts.answer.cidr, subnetMask: hosts.answer.subnetMask, usableHosts: String(hosts.answer.usableHosts) }, hosts).cidr, true)
})
