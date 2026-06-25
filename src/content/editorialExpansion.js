export const editorialExpansion = {
  '1.2': {
    title: 'Choosing the right network appliance',
    plainLanguage:
      'A network appliance is a device or service that performs a specific job for traffic. Start by naming the job: connect networks, connect local devices, block risky traffic, inspect suspicious traffic, spread users across servers, or hide/protect clients behind a proxy.',
    workplaceExample:
      'A 40-person office usually needs switches for desks and access points, a router or firewall at the internet edge, and maybe a VPN function for remote workers. A public web application may add a load balancer in front of two web servers and a web application firewall before traffic reaches the app.',
    misconception:
      'Beginners often call every network box a router. On Network+, be more precise: switches forward inside a LAN, routers forward between networks, firewalls enforce policy, proxies act on behalf of clients or servers, and load balancers distribute sessions.',
    examReasoning:
      'When a question describes symptoms, pick the function that solves the stated problem. Use a firewall for allow/deny policy, IDS/IPS for detection or blocking of suspicious patterns, a load balancer for server availability, and a proxy for controlled application-layer access.',
    practiceCluster: {
      title: 'Device selection mini-drill',
      prompts: [
        'Guest Wi-Fi must reach the internet but not internal file shares. Best first control: firewall rules or ACLs between guest and internal networks.',
        'Two web servers host the same app and users should survive one server failure. Best device: load balancer.',
        'A branch must connect its LAN to headquarters over a WAN. Best function: router or firewall/router edge.',
        'Users need web filtering and cached outbound access. Best function: forward proxy.',
      ],
    },
  },
  '1.3': {
    title: 'Cloud networking from zero',
    plainLanguage:
      'Cloud networking means you are building networks inside someone else’s data center. You still create subnets, route tables, gateways, firewalls, DNS records, and private links, but they are configured through a provider console or API instead of a physical rack.',
    workplaceExample:
      'A company might place web servers in a public cloud subnet, databases in a private cloud subnet, and connect the cloud network back to headquarters with a site-to-site VPN. Users see an application; admins see routes, security groups, DNS, and identity controls.',
    misconception:
      'Cloud does not remove networking. It changes where the devices live and what they are called. A security group is not magic; it is a stateful traffic filter. A VPC or VNet is not the internet; it is a private routed network boundary.',
    examReasoning:
      'Cloud questions usually test vocabulary and placement. Choose VPN for encrypted connectivity over the internet, direct/private connection for dedicated provider connectivity, security groups for instance-level filtering, and route tables/gateways for path decisions.',
    practiceCluster: {
      title: 'Cloud connectivity mini-drill',
      prompts: [
        'Need encrypted cloud-to-office connectivity quickly and cheaply: site-to-site VPN.',
        'Need predictable private bandwidth to a cloud provider: dedicated/direct connection.',
        'Need to restrict inbound traffic to one cloud server: security group or cloud firewall rule.',
        'Need cloud subnets to reach the internet for updates: internet gateway or NAT gateway depending on whether inbound access is allowed.',
      ],
    },
  },
  '1.5': {
    title: 'Media choices you can picture',
    plainLanguage:
      'Transmission media is the physical or wireless path bits travel across. Copper is common for desks and PoE devices, fiber is common for distance and high bandwidth, and transceivers are the removable modules that let switches speak the right optical or copper format.',
    workplaceExample:
      'A ceiling access point might use Cat6 because it needs both data and PoE. A link between buildings should use fiber because it handles distance and electrical isolation better. A switch uplink may need an SFP or SFP+ transceiver that matches both the cable type and speed.',
    misconception:
      'The connector fitting does not guarantee the link will work. Speed, fiber type, wavelength, distance rating, duplex, and transceiver compatibility must all match.',
    examReasoning:
      'Look for distance, interference, bandwidth, and power clues. Choose fiber for long runs or EMI-heavy areas, copper for short access runs and PoE, plenum-rated cable for air-handling spaces, and the matching transceiver for the port and medium.',
    practiceCluster: {
      title: 'Media selection mini-drill',
      prompts: [
        'Desk phone and access point need power from the switch: copper Ethernet with PoE.',
        'Building-to-building link across a campus: fiber, commonly single-mode for longer distances.',
        'Cable run through air-handling ceiling space: plenum-rated cable.',
        'Switch has an SFP+ slot and needs a 10G fiber uplink: compatible SFP+ optical transceiver.',
      ],
    },
  },
  '1.6': {
    title: 'Topology comparisons',
    plainLanguage:
      'Topology is the relationship between network parts. It can describe the physical cabling shape, the logical traffic path, or the architecture pattern used to scale and protect the network.',
    workplaceExample:
      'A small office may use a simple star where every device connects to one switch. A campus may use access, distribution, and core layers. A data center may use spine-leaf so servers have predictable east-west paths. A cloud design may use hub-and-spoke networking to centralize inspection.',
    misconception:
      'Topology diagrams are not only art. They explain failure impact. If one central device failure disconnects everyone, the design has a single point of failure even if all cables look tidy.',
    examReasoning:
      'Match the topology to the requirement. Choose mesh for redundancy, star for simple access networks, spine-leaf for scalable data centers, hub-and-spoke for centralized shared services, and hybrid when multiple patterns are combined.',
    practiceCluster: {
      title: 'Topology mini-drill',
      prompts: [
        'Small office where all endpoints connect to one switch: star.',
        'Every branch connects to headquarters for shared firewall inspection: hub-and-spoke.',
        'Data center needs predictable server-to-server paths: spine-leaf.',
        'WAN design needs multiple alternate paths between sites: mesh or partial mesh.',
      ],
    },
  },
  '1.7': {
    title: 'Subnetting as a routing decision',
    plainLanguage:
      'IPv4 addressing is how a host decides whether a destination is local or remote. The IP address identifies the host, the subnet mask identifies the local network, and the default gateway is the router used when the destination is outside that local network.',
    workplaceExample:
      'A printer at 192.168.10.50/24 and a laptop at 192.168.10.25/24 are local to each other. A server at 192.168.20.50 is remote, so the laptop sends that traffic to its default gateway instead of ARPing for the server directly.',
    misconception:
      'A subnet mask is not just decoration after the IP address. Changing /24 to /25 changes which addresses are local, which address is broadcast, and how many hosts fit.',
    examReasoning:
      'Expect questions that ask for network address, broadcast address, usable range, gateway behavior, or the smallest subnet for a host count. Use the dedicated subnetting practice page until those become automatic.',
    practiceCluster: {
      title: 'Subnetting mini-drill',
      prompts: [
        'Given 192.168.4.77/26, find the block size first, then network and broadcast.',
        'Given 50 required hosts, choose /26 because it provides 62 usable hosts.',
        'Given 255.255.255.240, convert to /28 and remember the block size is 16.',
        'If two hosts are in different subnets, traffic must go through a router/default gateway.',
      ],
    },
  },
  '1.8': {
    title: 'Modern network environments without buzzword fog',
    plainLanguage:
      'Modern networking uses software, identity, automation, and cloud-delivered policy to manage networks that are no longer only inside one building. The goal is still familiar: connect users and systems securely, reliably, and observably.',
    workplaceExample:
      'A remote employee may authenticate through identity-aware SASE controls, reach SaaS apps directly, access private apps through a secure connector, and still be governed by logging and policy. An IoT camera may be segmented locally and monitored because it cannot run normal endpoint tools.',
    misconception:
      'Software-defined does not mean the physical network disappeared. Packets still cross links and routers; software-defined tools make policy and path decisions easier to centralize, automate, and audit.',
    examReasoning:
      'Network+ usually expects concept recognition. SDN separates control from forwarding, SD-WAN chooses WAN paths by policy, SASE/SSE deliver security functions near users, IaC makes infrastructure repeatable, and IPv6 reduces dependence on IPv4 workarounds.',
    practiceCluster: {
      title: 'Modern environments mini-drill',
      prompts: [
        'Need centralized policy for branch WAN path choice: SD-WAN.',
        'Need cloud-delivered secure access for remote users: SASE or SSE depending on scope.',
        'Need repeatable versioned network deployment: infrastructure as code.',
        'Need to isolate smart cameras from finance laptops: IoT segmentation.',
      ],
    },
  },
  '2.3': {
    title: 'Wireless design decisions',
    plainLanguage: 'Wireless design balances coverage, capacity, channel use, roaming, and authentication. More signal is not always better if neighboring access points interfere with each other.',
    workplaceExample: 'A warehouse may need directional antennas for aisles, while a classroom wing may need more APs at lower power for dense groups of students.',
    misconception: 'Adding one powerful AP rarely fixes a busy network. Capacity, channel planning, and client density matter as much as coverage.',
    examReasoning: 'Use density and roaming clues to choose AP placement, channel width, band, power level, and WPA2/WPA3 Enterprise authentication.',
    practiceCluster: { title: 'Wireless mini-drill', prompts: ['High-density classroom: more APs at lower power.', 'Roaming voice clients: overlap cells carefully and use enterprise authentication.', 'Interference on 2.4 GHz: prefer 5/6 GHz when clients support it.', 'Directional outdoor link: choose appropriate directional antennas.'] },
  },
  '2.4': {
    title: 'Physical installation decisions',
    plainLanguage: 'Physical installation covers racks, power, cooling, cable management, labels, patch panels, and environmental factors that make the network maintainable.',
    workplaceExample: 'A messy closet with unlabeled patch cords turns a five-minute port move into an outage risk.',
    misconception: 'Physical work is not separate from networking. Bad power, heat, labels, or cable bend radius can create network incidents.',
    examReasoning: 'Match symptoms and requirements to UPS, PDU, rack unit, patch panel, cable tray, grounding, and temperature controls.',
    practiceCluster: { title: 'Install mini-drill', prompts: ['Need graceful shutdown during power loss: UPS.', 'Need organized wall-jack termination: patch panel.', 'Need to avoid overheating: airflow and environmental monitoring.', 'Need trace a user port quickly: labeling and documentation.'] },
  },
  '3.1': {
    title: 'Operations vocabulary in practice',
    plainLanguage: 'Operations processes are the habits that keep networks understandable: diagrams, baselines, change records, inventories, maintenance windows, and rollback plans.',
    workplaceExample: 'Before changing a trunk, an admin records the current config, gets approval, schedules a window, prepares rollback, and updates documentation after verification.',
    misconception: 'Change management is not paperwork for its own sake. It prevents surprise outages and gives the team a way back.',
    examReasoning: 'Look for words like baseline, rollback, approval, asset, SLA, MOU, and diagram; the best answer usually reduces risk and preserves evidence.',
    practiceCluster: { title: 'Operations mini-drill', prompts: ['You need to compare current utilization to normal: use a baseline.', 'You need to undo a failed change: use a rollback plan.', 'You need to know switch ownership and warranty status: use the asset inventory.', 'You need to schedule a disruptive upgrade: use a maintenance window.'] },
  },
  '3.2': {
    title: 'Monitoring evidence',
    plainLanguage: 'Monitoring tools collect evidence about traffic, device health, events, and trends so administrators can see changes before guessing.',
    workplaceExample: 'Syslog shows interface flaps, SNMP graphs show rising bandwidth, and NetFlow shows which application is using the link.',
    misconception: 'Ping is not monitoring by itself. It tests reachability, but it does not explain long-term capacity, errors, or application mix.',
    examReasoning: 'Choose SNMP for device metrics, syslog for event messages, NetFlow/sFlow for traffic conversations, and packet capture for packet-level proof.',
    practiceCluster: { title: 'Monitoring mini-drill', prompts: ['Need interface utilization over time: SNMP.', 'Need device event messages: syslog.', 'Need top talkers on a WAN link: NetFlow/sFlow.', 'Need inspect handshake details: packet capture.'] },
  },
  '3.3': {
    title: 'Recovery priorities',
    plainLanguage: 'Disaster recovery decides how quickly service must return and how much data loss the business can tolerate.',
    workplaceExample: 'A payment system may need redundant links and fast failover, while a lab file server may be restored from backup during business hours.',
    misconception: 'Backups alone are not disaster recovery. You also need restore testing, priority, documentation, and realistic recovery targets.',
    examReasoning: 'RTO is time to restore service; RPO is acceptable data loss. Those two numbers drive redundancy, backup frequency, and failover design.',
    practiceCluster: { title: 'DR mini-drill', prompts: ['Maximum downtime allowed: RTO.', 'Maximum data loss allowed: RPO.', 'Need prove backups work: test restore.', 'Need automatic alternate path: failover/redundancy.'] },
  },
  '3.5': {
    title: 'Remote access choices',
    plainLanguage: 'Remote access is controlled entry into systems or networks from somewhere else. Good designs add authentication, logging, and narrow access.',
    workplaceExample: 'An admin may connect through MFA VPN, land on a jump box, then SSH to a switch management interface that is not exposed to the internet.',
    misconception: 'Opening RDP or SSH directly to the internet is not the same as secure remote access.',
    examReasoning: 'Choose VPN for private network access, SSH for secure CLI administration, RDP for Windows GUI access, jump boxes for controlled admin paths, and out-of-band for access when the production network is down.',
    practiceCluster: { title: 'Remote access mini-drill', prompts: ['Secure CLI to a router: SSH.', 'Private tunnel for remote employee: VPN.', 'Controlled admin landing point: jump box.', 'Manage device during WAN outage: out-of-band management.'] },
  },
  '4.1': {
    title: 'Security concepts as access decisions',
    plainLanguage: 'Network security starts by deciding who should access what, from where, with which proof, and what should be logged.',
    workplaceExample: 'Guest devices can reach the internet but not internal servers; administrators use MFA and management VLANs; servers accept only required application traffic.',
    misconception: 'A firewall alone is not security. Segmentation, identity, hardening, monitoring, and least privilege all reduce different risks.',
    examReasoning: 'Map each control to the risk: least privilege limits access, segmentation limits spread, AAA controls admin identity, and hardening removes unnecessary exposure.',
    practiceCluster: { title: 'Security concept mini-drill', prompts: ['Limit user rights to required tasks: least privilege.', 'Separate guest Wi-Fi from internal LAN: segmentation.', 'Centralize admin authentication and accounting: AAA.', 'Remove unused services: hardening.'] },
  },
  '4.2': {
    title: 'Attack to impact',
    plainLanguage: 'Network attacks usually try to impersonate something, redirect traffic, interrupt service, or observe data.',
    workplaceExample: 'A rogue DHCP server can hand clients a malicious default gateway, while ARP poisoning can redirect local traffic through an attacker.',
    misconception: 'Not every attack looks like malware on a laptop. Some attacks abuse normal network protocols and cause confusing connectivity symptoms.',
    examReasoning: 'Use the symptom to identify the attack: duplicate IPs or wrong gateway may suggest rogue DHCP; MAC table overflow affects switches; DoS affects availability.',
    practiceCluster: { title: 'Attack mini-drill', prompts: ['Wrong gateway from unknown server: rogue DHCP.', 'Local traffic redirected through attacker: ARP poisoning.', 'Switch flooded with fake MACs: MAC flooding.', 'Service overwhelmed by traffic: DoS/DDoS.'] },
  },
  '4.3': {
    title: 'Choosing defensive controls',
    plainLanguage: 'Defensive controls work best when placed close to the behavior they need to stop: switch port, wireless edge, router ACL, firewall, identity provider, or monitoring sensor.',
    workplaceExample: 'A lobby wall jack can use port security or NAC; server VLANs can use ACLs; internet-facing apps can use firewall rules and IDS/IPS monitoring.',
    misconception: 'IDS and IPS are not the same. IDS alerts; IPS can block. Both need tuning and do not replace segmentation or access control.',
    examReasoning: 'Choose ACLs for traffic filtering, NAC for device admission, port security for switch-port limits, WPA3/802.1X for wireless authentication, and IDS/IPS for suspicious traffic detection or prevention.',
    practiceCluster: { title: 'Defense mini-drill', prompts: ['Unknown laptop plugs into office jack: NAC or port security.', 'Block one subnet from another: ACL/firewall rule.', 'Detect exploit signatures: IDS.', 'Block exploit inline: IPS.'] },
  },
  '5.2': {
    title: 'Physical symptom patterns',
    plainLanguage: 'Cabling and interface problems often show up as link drops, speed mismatch, CRC errors, no light, poor PoE, or flapping ports.',
    workplaceExample: 'A workstation connects at 100 Mbps instead of 1 Gbps because one cable pair is damaged, or an AP reboots because the switch cannot provide the needed PoE budget.',
    misconception: 'If an IP address is missing, do not jump straight to DHCP. First confirm the link, VLAN, port state, and physical layer.',
    examReasoning: 'Use cable tester for wiring faults, interface counters for errors, transceiver checks for fiber links, and switch port status for speed, duplex, VLAN, and PoE.',
    practiceCluster: { title: 'Physical troubleshooting mini-drill', prompts: ['No link light: cable, port, transceiver, or admin-down state.', 'High CRC errors: cable, interference, duplex, or NIC issue.', 'AP keeps rebooting: PoE budget or cable issue.', 'Fiber link down: check Tx/Rx polarity and transceiver match.'] },
  },
  '5.3': {
    title: 'Service failure separation',
    plainLanguage: 'Network services provide addresses, names, time, and identity. Troubleshooting gets easier when you separate which service failed.',
    workplaceExample: 'If a client can ping 8.8.8.8 but cannot open example.com, routing works and DNS becomes the likely focus.',
    misconception: '“The internet is down” can mean DHCP failed, DNS failed, the gateway is unreachable, a certificate expired, or authentication broke.',
    examReasoning: 'APIPA points toward DHCP failure, name lookup errors point toward DNS, time skew can break authentication, and certificate errors can break secure services.',
    practiceCluster: { title: 'Service troubleshooting mini-drill', prompts: ['169.254.x.x address: DHCP failure.', 'Ping IP works but names fail: DNS.', 'Kerberos/authentication failures with clock drift: NTP/time.', 'HTTPS warning after renewal mistake: certificate issue.'] },
  },
  '5.4': {
    title: 'Performance vocabulary',
    plainLanguage: 'Performance problems are about quality: latency is delay, jitter is changing delay, loss is missing packets, throughput is delivered data, and congestion is too much traffic for a path.',
    workplaceExample: 'A VoIP call can sound robotic because of jitter and loss even when a speed test says the connection is fast.',
    misconception: 'Bandwidth is not the only performance metric. Real-time applications care heavily about latency, jitter, and loss.',
    examReasoning: 'Match application symptoms to metrics: voice/video suffer from jitter and latency, file transfers suffer from throughput bottlenecks, and wireless clients suffer from signal/interference/channel problems.',
    practiceCluster: { title: 'Performance mini-drill', prompts: ['Voice breaks up: jitter or packet loss.', 'Large downloads slow at peak time: congestion/throughput.', 'Cloud app feels delayed from far site: latency.', 'Wi-Fi slow near microwave or crowded channel: interference.'] },
  },
  '5.5': {
    title: 'Tool output practice',
    plainLanguage: 'Troubleshooting tools answer different questions. Pick the tool that proves the next layer or narrows the path.',
    workplaceExample: 'An admin may ping the gateway, traceroute to the app, use nslookup for the hostname, check arp for local resolution, and capture packets only when simpler evidence is not enough.',
    misconception: 'Running more tools is not the same as troubleshooting. Each command should answer a specific question.',
    examReasoning: 'Use ping for reachability, traceroute/tracert for path, ipconfig/ifconfig/ip for local settings, nslookup/dig for DNS, netstat/ss for sockets, tcpdump/Wireshark for packet detail, and LLDP/CDP for neighbor discovery.',
    practiceCluster: {
      title: 'Tool mini-drill',
      prompts: [
        'Output `Reply from 192.168.1.1` proves basic IP reachability with ping.',
        'Output showing hops ending at the ISP edge points to path testing with traceroute/tracert.',
        'Output `server cannot find app.local: NXDOMAIN` points to DNS record or zone issues.',
        'Output showing the connected switch name and port is neighbor discovery with LLDP/CDP.',
      ],
    },
  },
}

export const tierOneEditorialObjectives = ['1.2', '1.3', '1.5', '1.6', '1.7', '1.8']

export function getEditorialExpansion(objective) {
  return editorialExpansion[String(objective)] ?? null
}
