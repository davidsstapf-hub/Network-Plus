export function isValidIpv4Address(address) {
  const octets = String(address).trim().split(".")
  return (
    octets.length === 4 &&
    octets.every((octet) => /^\d+$/.test(octet) && Number(octet) >= 0 && Number(octet) <= 255)
  )
}

export function ipv4ToInt(address) {
  if (!isValidIpv4Address(address)) throw new Error("Invalid IPv4 address")
  return String(address)
    .trim()
    .split(".")
    .reduce((value, octet) => (value << 8) + Number(octet), 0) >>> 0
}

export function intToIpv4(value) {
  const normalized = Number(value) >>> 0
  return [24, 16, 8, 0].map((shift) => (normalized >>> shift) & 255).join(".")
}

export function prefixToMask(prefix) {
  const parsed = Number(prefix)
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 32) throw new Error("Invalid prefix")
  return parsed === 0 ? 0 : (0xffffffff << (32 - parsed)) >>> 0
}

export function octetToBinary(octet) {
  const parsed = Number(octet)
  if (!Number.isInteger(parsed) || parsed < 0 || parsed > 255) throw new Error("Invalid octet")
  return parsed.toString(2).padStart(8, "0")
}

export function calculateSubnet(address, prefix) {
  const parsedPrefix = Number(prefix)
  const ip = ipv4ToInt(address)
  const mask = prefixToMask(parsedPrefix)
  const wildcard = (~mask) >>> 0
  const network = (ip & mask) >>> 0
  const broadcast = (network | wildcard) >>> 0
  const totalAddresses = parsedPrefix === 32 ? 1 : 2 ** (32 - parsedPrefix)
  const usableHosts = parsedPrefix >= 31 ? 0 : Math.max(0, totalAddresses - 2)
  const firstUsable = parsedPrefix >= 31 ? null : network + 1
  const lastUsable = parsedPrefix >= 31 ? null : broadcast - 1
  const blockSize = parsedPrefix >= 24 ? 2 ** (32 - parsedPrefix) : null
  const interestingOctet = Math.min(4, Math.floor(parsedPrefix / 8) + 1)

  return {
    input: `${address}/${parsedPrefix}`,
    address: intToIpv4(ip),
    prefix: parsedPrefix,
    subnetMask: intToIpv4(mask),
    wildcardMask: intToIpv4(wildcard),
    networkAddress: intToIpv4(network),
    broadcastAddress: intToIpv4(broadcast),
    firstUsable: firstUsable === null ? "N/A" : intToIpv4(firstUsable),
    lastUsable: lastUsable === null ? "N/A" : intToIpv4(lastUsable),
    totalAddresses,
    usableHosts,
    blockSize,
    interestingOctet,
    binaryAddress: intToIpv4(ip).split(".").map(octetToBinary).join("."),
    binaryMask: intToIpv4(mask).split(".").map(octetToBinary).join("."),
    binaryNetwork: intToIpv4(network).split(".").map(octetToBinary).join("."),
  }
}

export function maskToPrefix(mask) {
  const value = ipv4ToInt(mask)
  const binary = value.toString(2).padStart(32, "0")
  if (!/^1*0*$/.test(binary)) throw new Error("Invalid subnet mask")
  return binary.indexOf("0") === -1 ? 32 : binary.indexOf("0")
}

export function hostsToPrefix(requiredHosts) {
  const hosts = Number(requiredHosts)
  if (!Number.isInteger(hosts) || hosts < 1) throw new Error("Invalid host count")
  for (let prefix = 32; prefix >= 0; prefix -= 1) {
    const usableHosts = prefix >= 31 ? 0 : (2 ** (32 - prefix)) - 2
    if (usableHosts >= hosts) return prefix
  }
  return 0
}

function seededValue(seed) {
  let value = (seed * 1664525 + 1013904223) >>> 0
  value = (value ^ (value >>> 16)) >>> 0
  return value
}

function makeSubnetSeed(seed) {
  const prefix = 16 + (seed % 15)
  const first = [10, 172, 192, 53, 64, 100, 198][seed % 7]
  const second =
    first === 172
      ? 16 + ((seed >>> 4) % 16)
      : first === 192
        ? 168
        : (seed >>> 5) % 256
  const third = (seed >>> 13) % 256
  const fourth = ((seed >>> 21) % 254) + 1
  const address = `${first}.${second}.${third}.${fourth}`
  const answer = calculateSubnet(address, prefix)
  return { address, prefix, answer }
}

function field(key, label, value, inputMode = "text") {
  return { key, label, value: String(value), inputMode }
}

function makeClassicDrill(index, seed) {
  const { address, prefix, answer } = makeSubnetSeed(seed)
  return {
    id: `subnet-practice-${String(index + 1).padStart(3, "0")}`,
    type: "classic",
    mode: "Network / broadcast",
    prompt: `Find the network address, broadcast address, wildcard mask, and max valid hosts for ${address}/${prefix}.`,
    address,
    prefix,
    netmask: answer.subnetMask,
    answer,
    answers: [
      field("networkAddress", "Network Address", answer.networkAddress, "decimal"),
      field("broadcastAddress", "Broadcast Address", answer.broadcastAddress, "decimal"),
      field("wildcardMask", "Wildcard Mask", answer.wildcardMask, "decimal"),
      field("usableHosts", "Max valid hosts in this subnet", answer.usableHosts, "numeric"),
    ],
  }
}

function makeCidrToMaskDrill(index, seed) {
  const prefix = 8 + (seed % 23)
  const mask = intToIpv4(prefixToMask(prefix))
  return {
    id: `subnet-cidr-mask-${String(index + 1).padStart(3, "0")}`,
    type: "cidr-to-mask",
    mode: "CIDR to mask",
    prompt: `Convert /${prefix} into a dotted-decimal subnet mask and wildcard mask.`,
    address: "Prefix",
    prefix,
    netmask: mask,
    answer: { subnetMask: mask, wildcardMask: intToIpv4((~prefixToMask(prefix)) >>> 0), usableHosts: prefix >= 31 ? 0 : (2 ** (32 - prefix)) - 2 },
    answers: [
      field("subnetMask", "Subnet Mask", mask, "decimal"),
      field("wildcardMask", "Wildcard Mask", intToIpv4((~prefixToMask(prefix)) >>> 0), "decimal"),
      field("usableHosts", "Usable Hosts", prefix >= 31 ? 0 : (2 ** (32 - prefix)) - 2, "numeric"),
    ],
  }
}

function makeMaskToCidrDrill(index, seed) {
  const prefix = 8 + (seed % 23)
  const mask = intToIpv4(prefixToMask(prefix))
  return {
    id: `subnet-mask-cidr-${String(index + 1).padStart(3, "0")}`,
    type: "mask-to-cidr",
    mode: "Mask to CIDR",
    prompt: `Convert subnet mask ${mask} into CIDR notation and wildcard mask.`,
    address: mask,
    prefix,
    netmask: mask,
    answer: { prefix, cidr: `/${prefix}`, wildcardMask: intToIpv4((~prefixToMask(prefix)) >>> 0) },
    answers: [
      field("cidr", "CIDR Prefix", `/${prefix}`),
      field("wildcardMask", "Wildcard Mask", intToIpv4((~prefixToMask(prefix)) >>> 0), "decimal"),
    ],
  }
}

function makeHostSizingDrill(index, seed) {
  const requiredHosts = [6, 14, 30, 50, 62, 100, 126, 200, 254, 500, 1000][seed % 11]
  const prefix = hostsToPrefix(requiredHosts)
  const mask = intToIpv4(prefixToMask(prefix))
  const usableHosts = (2 ** (32 - prefix)) - 2
  return {
    id: `subnet-hosts-${String(index + 1).padStart(3, "0")}`,
    type: "host-sizing",
    mode: "Required hosts",
    prompt: `Choose the smallest subnet that supports at least ${requiredHosts} usable hosts.`,
    address: `${requiredHosts} hosts`,
    prefix,
    netmask: mask,
    answer: { requiredHosts, prefix, cidr: `/${prefix}`, subnetMask: mask, usableHosts },
    answers: [
      field("cidr", "Smallest CIDR Prefix", `/${prefix}`),
      field("subnetMask", "Subnet Mask", mask, "decimal"),
      field("usableHosts", "Usable Hosts Provided", usableHosts, "numeric"),
    ],
  }
}

function makeBinaryDrill(index, seed) {
  const octet = seed % 256
  return {
    id: `subnet-binary-${String(index + 1).padStart(3, "0")}`,
    type: "binary",
    mode: "Binary octet",
    prompt: `Convert decimal octet ${octet} into 8-bit binary.`,
    address: String(octet),
    prefix: null,
    netmask: "Binary",
    answer: { binaryOctet: octetToBinary(octet) },
    answers: [
      field("binaryOctet", "8-bit Binary", octetToBinary(octet), "numeric"),
    ],
  }
}

function makeVlsmDrill(index, seed) {
  const baseThird = (seed >>> 8) % 200
  const base = `10.${(seed >>> 3) % 200}.${baseThird}.0`
  const requiredHosts = [14, 30, 50, 62, 100, 126][seed % 6]
  const prefix = hostsToPrefix(requiredHosts)
  const answer = calculateSubnet(base, prefix)
  return {
    id: `subnet-vlsm-${String(index + 1).padStart(3, "0")}`,
    type: "vlsm",
    mode: "VLSM allocation",
    prompt: `Allocate the first subnet from ${base}/24 for a department that needs ${requiredHosts} usable hosts.`,
    address: base,
    prefix,
    netmask: answer.subnetMask,
    answer: { ...answer, requiredHosts, cidr: `/${prefix}` },
    answers: [
      field("cidr", "Chosen CIDR Prefix", `/${prefix}`),
      field("networkAddress", "Network Address", answer.networkAddress, "decimal"),
      field("broadcastAddress", "Broadcast Address", answer.broadcastAddress, "decimal"),
      field("usableHosts", "Usable Hosts Provided", answer.usableHosts, "numeric"),
    ],
  }
}

export function generateSubnetPracticeBank(count = 360) {
  const makers = [makeClassicDrill, makeCidrToMaskDrill, makeMaskToCidrDrill, makeHostSizingDrill, makeVlsmDrill, makeBinaryDrill]
  return Array.from({ length: count }, (_, index) => {
    const seed = seededValue(index + 1)
    return makers[index % makers.length](index, seed)
  })
}

export function generateSubnetPrompt(seed = Date.now()) {
  const bank = generateSubnetPracticeBank()
  return bank[Math.abs(seed) % bank.length]
}

export function normalizeSubnetAnswer(value) {
  return String(value).trim().replace(/\s+/g, "").toLowerCase()
}

export function checkSubnetPracticeAnswers(answers, prompt) {
  const expected = Object.fromEntries((prompt.answers ?? [
    field("networkAddress", "Network Address", prompt.answer.networkAddress, "decimal"),
    field("broadcastAddress", "Broadcast Address", prompt.answer.broadcastAddress, "decimal"),
    field("wildcardMask", "Wildcard Mask", prompt.answer.wildcardMask, "decimal"),
    field("usableHosts", "Max valid hosts in this subnet", prompt.answer.usableHosts, "numeric"),
  ]).map((answer) => [answer.key, answer.value]))
  return Object.fromEntries(
    Object.entries(expected).map(([key, expectedValue]) => [
      key,
      normalizeSubnetAnswer(answers[key]) === normalizeSubnetAnswer(expectedValue),
    ]),
  )
}
