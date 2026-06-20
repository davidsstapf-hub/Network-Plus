const bridge = {
  '1.1': {
    vocabulary: ['Encapsulation', 'PDU', 'Frame', 'Packet', 'Segment', 'Port number'],
    why: 'The OSI and TCP/IP models give you a shared troubleshooting map: physical signal first, application behavior last.',
    example: 'If a user cannot reach a website, you can check link lights, IP settings, DNS, routing, TCP 443, and then the browser or server app in order.',
    mentalModel: 'Think of data as a package that gets a new label at each layer before it leaves, then has each label removed as it arrives.',
  },
  '1.2': {
    vocabulary: ['Router', 'Switch', 'Firewall', 'Load balancer', 'Proxy', 'IDS/IPS'],
    why: 'Network appliances exist because different jobs need different forwarding, filtering, inspection, or availability decisions.',
    example: 'A branch office usually needs a switch for local devices, a router or firewall for the WAN edge, and wireless access points for mobile clients.',
    mentalModel: 'Ask what decision the box makes: where to send traffic, whether to allow traffic, how to inspect traffic, or how to share load.',
  },
  '1.3': {
    vocabulary: ['IaaS', 'SaaS', 'Hybrid cloud', 'VPC/VNet', 'Direct connection', 'VPN'],
    why: 'Cloud networking extends the same routing, segmentation, DNS, and security ideas into provider-owned infrastructure.',
    example: 'A company may connect an on-premises data center to an AWS VPC through a site-to-site VPN so cloud servers can reach internal databases.',
    mentalModel: 'Treat cloud networks as rented network rooms: you still design subnets, routes, access rules, and name resolution.',
  },
  '1.4': {
    vocabulary: ['Protocol', 'Port', 'TCP', 'UDP', 'DNS', 'DHCP', 'HTTPS'],
    why: 'Common ports let you recognize what a device is trying to do and where a firewall or service failure may be blocking it.',
    example: 'If a laptop has an IP address but cannot resolve names, UDP/TCP 53 and DNS server reachability become the first things to test.',
    mentalModel: 'An IP address finds the building; a port number finds the service desk inside that building.',
  },
  '1.5': {
    vocabulary: ['UTP', 'Fiber', 'SFP', 'Transceiver', 'Duplex', 'PoE', 'Attenuation'],
    why: 'Media choices determine distance, speed, power delivery, interference tolerance, and installation cost.',
    example: 'A ceiling access point may need Cat6 with PoE, while a link between buildings usually needs fiber and matching transceivers.',
    mentalModel: 'Cabling is the road surface: the wrong surface limits speed or stops the trip before protocols even matter.',
  },
  '1.6': {
    vocabulary: ['LAN', 'WAN', 'MAN', 'Star', 'Mesh', 'Spine-leaf', 'Three-tier'],
    why: 'Topology affects resilience, cost, scalability, and where failures spread.',
    example: 'A small office often uses a star topology, while a data center may use spine-leaf to keep east-west server traffic predictable.',
    mentalModel: 'Draw who depends on whom; the drawing usually reveals bottlenecks and single points of failure.',
  },
  '1.7': {
    vocabulary: ['IPv4', 'Subnet mask', 'CIDR', 'Gateway', 'Network address', 'Broadcast address'],
    why: 'Subnetting tells devices which destinations are local and which must go to a router.',
    example: 'A host at 192.168.10.25/24 sends 192.168.10.80 directly on the LAN, but sends 192.168.20.80 to its default gateway.',
    mentalModel: 'The mask is a highlighter: highlighted bits identify the network; the remaining bits identify hosts inside it.',
  },
  '1.8': {
    vocabulary: ['SDN', 'SASE', 'IoT', 'Zero trust', 'Edge computing', 'IPv6'],
    why: 'Modern environments blend campus, cloud, remote users, and small smart devices into one security and operations problem.',
    example: 'A remote worker may reach SaaS apps through SASE controls while IoT cameras sit on a segmented local VLAN.',
    mentalModel: 'Modern networking is less about one perimeter and more about identity, policy, and telemetry everywhere.',
  },
  '2.1': {
    vocabulary: ['Route', 'Next hop', 'Static route', 'Dynamic routing', 'Metric', 'Administrative distance'],
    why: 'Routing decides how traffic leaves one network and reaches another.',
    example: 'A default route sends unknown destinations to the firewall, while internal routes point branch traffic toward the WAN router.',
    mentalModel: 'Routers are road signs; each route says which next road to take for a destination network.',
  },
  '2.2': {
    vocabulary: ['VLAN', 'Trunk', 'Access port', 'STP', 'MAC address table', 'Port security'],
    why: 'Switching builds local networks, separates broadcast domains, and prevents loops.',
    example: 'Phones, workstations, and guest Wi-Fi can share switches while staying separated with VLANs and trunks.',
    mentalModel: 'A switch is a building directory for MAC addresses; VLANs create separate buildings on the same hardware.',
  },
  '2.3': {
    vocabulary: ['SSID', 'Channel', 'Band', 'Roaming', 'WPA3', 'Antenna'],
    why: 'Wireless design controls coverage, capacity, interference, and authentication.',
    example: 'A classroom wing may need more access points at lower power so many students can connect without co-channel interference.',
    mentalModel: 'Wi-Fi is shared airspace: clients take turns, and channel planning keeps conversations from talking over each other.',
  },
  '2.4': {
    vocabulary: ['Rack unit', 'Patch panel', 'UPS', 'PDU', 'Cable management', 'Environmental monitoring'],
    why: 'Good physical installation makes networks reliable, serviceable, and safe.',
    example: 'Clear labels and patch panels let a technician move one user port without tracing cables through a crowded closet.',
    mentalModel: 'Physical design is future troubleshooting insurance.',
  },
  '3.1': {
    vocabulary: ['Change management', 'Baseline', 'Runbook', 'Diagram', 'Asset inventory', 'SLA'],
    why: 'Operations processes keep a working network understandable and recoverable.',
    example: 'Before changing a switch trunk, a team records the current config, approval, rollback plan, and maintenance window.',
    mentalModel: 'Documentation is memory for the whole team, especially during outages.',
  },
  '3.2': {
    vocabulary: ['SNMP', 'Syslog', 'NetFlow', 'Baseline', 'Alert', 'Telemetry'],
    why: 'Monitoring turns hidden network behavior into evidence.',
    example: 'A bandwidth graph can show that slowness starts when nightly backups saturate an uplink.',
    mentalModel: 'Monitoring is the network telling you what changed before users can describe it clearly.',
  },
  '3.3': {
    vocabulary: ['RTO', 'RPO', 'Backup', 'Redundancy', 'Failover', 'Hot site'],
    why: 'Disaster recovery planning decides how fast service returns and how much data loss is acceptable.',
    example: 'A payment system may need a short RTO and redundant WAN links, while an archive server may tolerate slower restore.',
    mentalModel: 'RTO is downtime tolerance; RPO is data-loss tolerance.',
  },
  '3.4': {
    vocabulary: ['DNS', 'DHCP', 'IPAM', 'NTP', 'Lease', 'Record'],
    why: 'Core network services make addressing, names, and time work consistently.',
    example: 'If DHCP fails, clients may self-assign APIPA addresses and lose access even though switches are healthy.',
    mentalModel: 'DHCP gives devices an address, DNS gives names meaning, and NTP keeps evidence in order.',
  },
  '3.5': {
    vocabulary: ['VPN', 'SSH', 'RDP', 'Jump box', 'Out-of-band', 'MFA'],
    why: 'Remote access must balance administrative reach with control and accountability.',
    example: 'Admins may use MFA VPN plus a jump box instead of exposing switch management directly to the internet.',
    mentalModel: 'Remote access should create a controlled doorway, not a hole in the wall.',
  },
  '4.1': {
    vocabulary: ['CIA triad', 'Least privilege', 'Zero trust', 'Segmentation', 'Hardening', 'AAA'],
    why: 'Security concepts guide which controls reduce risk without breaking the network.',
    example: 'Guest Wi-Fi belongs on a segmented network with restricted access instead of the same VLAN as finance systems.',
    mentalModel: 'Security asks who should access what, from where, and under which proof.',
  },
  '4.2': {
    vocabulary: ['DoS', 'Spoofing', 'Poisoning', 'Rogue DHCP', 'VLAN hopping', 'On-path attack'],
    why: 'Attack knowledge helps you recognize symptoms and choose the right defense.',
    example: 'A rogue DHCP server may give clients the wrong gateway, sending their traffic through an attacker-controlled device.',
    mentalModel: 'Most network attacks either impersonate, interrupt, redirect, or observe traffic.',
  },
  '4.3': {
    vocabulary: ['ACL', 'NAC', 'Port security', 'IDS/IPS', 'Secure management', 'WPA3'],
    why: 'Defense features enforce policy at switches, routers, firewalls, wireless, and management planes.',
    example: 'Port security can limit which MAC addresses use a wall jack, while NAC can require device health before access.',
    mentalModel: 'Choose controls based on where the unwanted action can be stopped earliest and cleanly.',
  },
  '5.1': {
    vocabulary: ['Identify', 'Hypothesize', 'Test', 'Escalate', 'Implement', 'Verify', 'Document'],
    why: 'A repeatable troubleshooting method prevents random changes from making outages worse.',
    example: 'When users report slowness, you confirm scope, identify changes, test likely causes, apply a fix, verify, and document.',
    mentalModel: 'Troubleshooting is controlled narrowing: prove what it is and what it is not.',
  },
  '5.2': {
    vocabulary: ['Open', 'Short', 'TX/RX', 'CRC error', 'Duplex mismatch', 'Cable tester'],
    why: 'Physical problems often look like higher-layer failures until you check link and error evidence.',
    example: 'High CRC errors on one switch port may point to bad cable, interference, or a failing NIC.',
    mentalModel: 'If Layer 1 is unstable, every upper layer becomes unreliable.',
  },
  '5.3': {
    vocabulary: ['Scope', 'Lease', 'Resolver', 'Record', 'Certificate', 'Authentication'],
    why: 'Service failures can block many users even when routing and switching are fine.',
    example: 'If users can ping 8.8.8.8 but cannot browse by name, DNS is more likely than the default gateway.',
    mentalModel: 'Separate address, name, time, and identity problems before changing network paths.',
  },
  '5.4': {
    vocabulary: ['Latency', 'Jitter', 'Packet loss', 'Congestion', 'Throughput', 'RSSI'],
    why: 'Performance troubleshooting focuses on quality, not just whether a connection exists.',
    example: 'A video call can fail from jitter and packet loss even when speed tests look acceptable.',
    mentalModel: 'Performance is about delay, consistency, loss, and capacity together.',
  },
  '5.5': {
    vocabulary: ['ping', 'traceroute', 'nslookup', 'tcpdump', 'netstat', 'LLDP/CDP'],
    why: 'Tools provide evidence so you can locate failure by layer and by path.',
    example: 'Use ping for reachability, traceroute for path, nslookup for names, and packet capture when the conversation itself is unclear.',
    mentalModel: 'Pick the tool that answers the next smallest question.',
  },
}

export function getBeginnerBridge(objective) {
  return bridge[String(objective)] ?? null
}
