import { Activity, Blocks, Calculator, Radio, ShieldCheck, Wrench } from 'lucide-react'

export const domains = [
  {
    "short": "D1",
    "title": "Networking Concepts",
    "weight": 23,
    "color": "#00d9ff",
    "icon": Blocks,
    "id": 1,
    "topics": [
      "OSI Reference Model",
      "Network Appliances and Functions",
      "Cloud Concepts and Connectivity",
      "Ports, Protocols, Services, and Traffic",
      "Transmission Media and Transceivers",
      "Topologies, Architectures, and Network Types",
      "IPv4 Addressing and Subnetting",
      "Modern Network Environments"
    ]
  },
  {
    "short": "D2",
    "title": "Network Implementation",
    "weight": 20,
    "color": "#60efff",
    "icon": Radio,
    "id": 2,
    "topics": [
      "Routing Technologies",
      "Switching Technologies",
      "Wireless Technologies",
      "Physical Installation Factors"
    ]
  },
  {
    "short": "D3",
    "title": "Network Operations",
    "weight": 19,
    "color": "#8aa7ff",
    "icon": Activity,
    "id": 3,
    "topics": [
      "Organizational Processes and Procedures",
      "Network Monitoring Technologies",
      "Disaster Recovery Concepts",
      "IPv4 and IPv6 Network Services",
      "Remote Access Methods"
    ]
  },
  {
    "short": "D4",
    "title": "Network Security",
    "weight": 14,
    "color": "#e78cff",
    "icon": ShieldCheck,
    "id": 4,
    "topics": [
      "Basic Network Security Concepts",
      "Network Attacks and Impacts",
      "Security Features and Defense Techniques"
    ]
  },
  {
    "short": "D5",
    "title": "Network Troubleshooting",
    "weight": 24,
    "color": "#35f0a0",
    "icon": Wrench,
    "id": 5,
    "topics": [
      "Troubleshooting Methodology",
      "Cabling and Physical Interface Issues",
      "Network Service Issues",
      "Performance Issues",
      "Troubleshooting Tools and Protocols"
    ]
  },
  {
    "short": "Subnet",
    "title": "Subnetting Lab",
    "weight": 0,
    "color": "#00f5ff",
    "icon": Calculator,
    "id": 6,
    "topics": [
      "Binary Octets",
      "CIDR Prefixes",
      "Subnet Masks",
      "Block Size",
      "Network and Broadcast Addresses",
      "Usable Host Ranges",
      "Subnetting Calculator Practice"
    ]
  }
]

export const tiers = [
  {
    "id": "tier-1",
    "number": 1,
    "title": "Networking Concepts",
    "subtitle": "Go from zero to fluent in networking concepts.",
    "difficulty": "foundation",
    "color": "#00d9ff",
    "minutes": 441,
    "recommendedAfter": null,
    "modules": [
      {
        "id": "n11-osi-reference-model-section",
        "title": "Section 1.1 - OSI Reference Model",
        "summary": "Use the OSI model to understand what happens from a cable signal up to an application request.",
        "activities": [
          {
            "id": "n11-osi-reference-model-lesson",
            "type": "lesson",
            "title": "OSI Reference Model",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.1",
            "difficulty": "foundation",
            "summary": "Use the OSI model to understand what happens from a cable signal up to an application request.",
            "learningObjectives": [
              "Name all seven OSI layers in order",
              "Match common devices and symptoms to the right layer",
              "Use the OSI model as a troubleshooting checklist"
            ],
            "headings": [
              "What the OSI model is",
              "The seven layers from bottom to top",
              "How data moves through the stack",
              "How to use OSI for troubleshooting",
              "Common exam traps",
              "Mastery target"
            ],
            "content": [
              "The Open Systems Interconnection model is a teaching model that divides network communication into seven layers. It is not a product you install. It is a way to ask better questions. When a user says “the network is down,” the OSI model helps you separate physical signal problems, local switching problems, IP routing problems, transport problems, and application problems instead of treating every outage as one giant mystery.",
              "Layer 1 is Physical: cables, radio frequency, light through fiber, electrical signal, connectors, transceivers, and link lights. Layer 2 is Data Link: Ethernet frames, MAC addresses, switching, VLANs, trunks, and wireless association. Layer 3 is Network: IP addresses, subnets, gateways, routing, and ICMP. Layer 4 is Transport: TCP, UDP, ports, sessions, reliability, and flow behavior. Layer 5 is Session: creating, maintaining, and ending conversations. Layer 6 is Presentation: formatting, encryption, compression, and character encoding. Layer 7 is Application: protocols and services users recognize, such as HTTP, DNS, DHCP, SMTP, and SMB.",
              "When a device sends data, the application produces information at the top of the stack, and lower layers wrap it with the information needed for delivery. A web request might use HTTP at Layer 7, TLS at Layer 6, TCP port 443 at Layer 4, IP addressing at Layer 3, Ethernet framing at Layer 2, and copper or wireless signaling at Layer 1. The receiving system unwraps that information in the opposite direction.",
              "Troubleshooting usually starts low and moves up. If there is no link light, do not start with DNS. If the interface is up but the host is in the wrong VLAN, investigate Layer 2. If the host has a valid IP address but the default gateway is wrong, investigate Layer 3. If ping works but a website fails on port 443, investigate Layer 4 or higher. If the server answers but the app returns an error, you may be at Layer 7.",
              "A common trap is assuming one symptom belongs to only one layer. “Cannot reach a website” might be DNS, routing, firewall policy, TLS, proxy configuration, or the web service itself. Another trap is confusing devices with only one layer. A switch is mainly Layer 2, but a multilayer switch can route at Layer 3. A firewall can filter by ports at Layer 4 and inspect application behavior at Layer 7.",
              "For Network+, you should be able to list the layers, place common protocols and devices at the right layer, and use OSI language to justify a troubleshooting step. The model is valuable because it slows you down just enough to test the correct part of the path."
            ]
          },
          {
            "id": "n11-osi-reference-model-scenario",
            "type": "scenario",
            "title": "Worked scenario - OSI Reference Model",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.1",
            "difficulty": "foundation",
            "summary": "Apply osi reference model to a realistic Network+ decision.",
            "evidence": [
              "A user has link light and an IP address, but only HTTPS fails while ping to the server works.",
              "The objective evidence should let the technician match the symptom to the lowest layer that has not already been proven healthy.",
              "The decision should preserve service while narrowing osi reference model to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician match the symptom to the lowest layer that has not already been proven healthy.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This OSI Reference Model scenario is testing objective 1.1. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n11-osi-reference-model-cards",
            "type": "flashcards",
            "title": "OSI Reference Model flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.1",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.1.",
            "cards": [
              [
                "Layer 1 - Physical",
                "Signals, media, connectors, transceivers, cabling, radio, and link lights."
              ],
              [
                "Layer 2 - Data Link",
                "Frames, MAC addresses, switching, VLANs, trunks, and local delivery."
              ],
              [
                "Layer 3 - Network",
                "IP addressing, routing, subnets, gateways, and ICMP."
              ],
              [
                "Layer 4 - Transport",
                "TCP, UDP, ports, reliability, and transport sessions."
              ],
              [
                "Layer 5 - Session",
                "Establishing, maintaining, and ending conversations between systems."
              ],
              [
                "Layer 6 - Presentation",
                "Data formatting, encryption, compression, and encoding."
              ],
              [
                "Layer 7 - Application",
                "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
              ],
              [
                "Encapsulation",
                "Wrapping data with headers or trailers as it moves down the stack."
              ],
              [
                "Decapsulation",
                "Removing headers or trailers as data moves up the receiving stack."
              ],
              [
                "Layered troubleshooting",
                "Testing from physical evidence upward instead of guessing randomly."
              ],
              [
                "MAC address",
                "Layer 2 hardware address used for local frame delivery."
              ],
              [
                "IP address",
                "Layer 3 logical address used for routed delivery."
              ]
            ]
          },
          {
            "id": "n11-osi-reference-model-check",
            "type": "quiz",
            "title": "OSI Reference Model coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.1",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.1.",
            "questions": [
              {
                "id": "check-n11-osi-reference-model-001",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 1 - Physical?",
                "options": [
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Establishing, maintaining, and ending conversations between systems.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 0,
                "explanation": "Layer 1 - Physical matters in objective 1.1 because it covers signals, media, connectors, transceivers, cabling, radio, and link lights. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n11-osi-reference-model-002",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A user has link light and an IP address, but only HTTPS fails while ping to the server works. Which OSI layer should the technician investigate next?",
                "options": [
                  "Layer 1 because all network issues start with cabling.",
                  "Layer 2 because every web problem is a switching issue.",
                  "Layer 6 only because HTTPS always means presentation is the only layer involved.",
                  "Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.1, OSI Reference Model. Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n11-osi-reference-model-003",
                "objective": "1.1",
                "domain": 1,
                "prompt": "Before changing production settings for OSI Reference Model, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match the symptom to the lowest layer that has not already been proven healthy.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.1: match the symptom to the lowest layer that has not already been proven healthy. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n11-osi-reference-model-004",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A help desk note says: \"A user has link light and an IP address, but only HTTPS fails while ping to the server works.\" What is the best interpretation?",
                "options": [
                  "Layer 6 only because HTTPS always means presentation is the only layer involved.",
                  "Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area.",
                  "Layer 1 because all network issues start with cabling.",
                  "Layer 2 because every web problem is a switching issue."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For OSI Reference Model, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n11-osi-reference-model-005",
                "objective": "1.1",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.1, OSI Reference Model?",
                "options": [
                  "Evidence that lets the technician match the symptom to the lowest layer that has not already been proven healthy.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For OSI Reference Model, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n11-osi-reference-model-quiz",
            "type": "quiz",
            "title": "OSI Reference Model section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.1",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.1.",
            "questions": [
              {
                "id": "quiz-n11-osi-reference-model-001",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing OSI Reference Model. Which description correctly matches IP address?",
                "options": [
                  "Layer 3 logical address used for routed delivery.",
                  "Testing from physical evidence upward instead of guessing randomly.",
                  "Wrapping data with headers or trailers as it moves down the stack.",
                  "Data formatting, encryption, compression, and encoding."
                ],
                "correctIndex": 0,
                "explanation": "IP address matters in objective 1.1 because Layer 3 logical address used for routed delivery. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-002",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A user has link light and an IP address, but only HTTPS fails while ping to the server works. Which OSI layer should the technician investigate next?",
                "options": [
                  "Layer 1 because all network issues start with cabling.",
                  "Layer 2 because every web problem is a switching issue.",
                  "Layer 6 only because HTTPS always means presentation is the only layer involved.",
                  "Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.1, OSI Reference Model. Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-003",
                "objective": "1.1",
                "domain": 1,
                "prompt": "Before changing production settings for OSI Reference Model, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match the symptom to the lowest layer that has not already been proven healthy.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.1: match the symptom to the lowest layer that has not already been proven healthy. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-004",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A help desk note says: \"A user has link light and an IP address, but only HTTPS fails while ping to the server works.\" What is the best interpretation?",
                "options": [
                  "Layer 6 only because HTTPS always means presentation is the only layer involved.",
                  "Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area.",
                  "Layer 1 because all network issues start with cabling.",
                  "Layer 2 because every web problem is a switching issue."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For OSI Reference Model, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-005",
                "objective": "1.1",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.1, OSI Reference Model?",
                "options": [
                  "Evidence that lets the technician match the symptom to the lowest layer that has not already been proven healthy.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For OSI Reference Model, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-006",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 7 - Application?",
                "options": [
                  "Establishing, maintaining, and ending conversations between systems.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 3,
                "explanation": "Layer 7 - Application matters in objective 1.1 because it covers user-facing network services and protocols such as HTTP, DNS, DHCP, and SMB. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-007",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A user has link light and an IP address, but only HTTPS fails while ping to the server works. Which OSI layer should the technician investigate next?",
                "options": [
                  "Layer 2 because every web problem is a switching issue.",
                  "Layer 6 only because HTTPS always means presentation is the only layer involved.",
                  "Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area.",
                  "Layer 1 because all network issues start with cabling."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.1, OSI Reference Model. Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-008",
                "objective": "1.1",
                "domain": 1,
                "prompt": "Before changing production settings for OSI Reference Model, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match the symptom to the lowest layer that has not already been proven healthy.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.1: match the symptom to the lowest layer that has not already been proven healthy. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-009",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A help desk note says: \"A user has link light and an IP address, but only HTTPS fails while ping to the server works.\" What is the best interpretation?",
                "options": [
                  "Layer 4 or Layer 7 because transport ports or the application service are now the likely fault area.",
                  "Layer 1 because all network issues start with cabling.",
                  "Layer 2 because every web problem is a switching issue.",
                  "Layer 6 only because HTTPS always means presentation is the only layer involved."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For OSI Reference Model, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n11-osi-reference-model-010",
                "objective": "1.1",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.1, OSI Reference Model?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician match the symptom to the lowest layer that has not already been proven healthy."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For OSI Reference Model, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n12-network-appliances-and-functions-section",
        "title": "Section 1.2 - Network Appliances and Functions",
        "summary": "Compare the jobs performed by routers, switches, firewalls, proxies, load balancers, IDS/IPS, storage, VPN, QoS, and TTL.",
        "activities": [
          {
            "id": "n12-network-appliances-and-functions-lesson",
            "type": "lesson",
            "title": "Network Appliances and Functions",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.2",
            "difficulty": "foundation",
            "summary": "Compare the jobs performed by routers, switches, firewalls, proxies, load balancers, IDS/IPS, storage, VPN, QoS, and TTL.",
            "learningObjectives": [
              "Explain the primary job of common network appliances",
              "Separate appliance names from network functions",
              "Choose the right component for a scenario"
            ],
            "headings": [
              "Appliance versus function",
              "Core forwarding devices",
              "Security and inspection devices",
              "Performance and application delivery",
              "Storage and remote access functions",
              "Mastery target"
            ],
            "content": [
              "A network appliance is a device or virtual system that performs a network job. Some appliances are physical boxes. Others are virtual machines, cloud services, or software functions. The exam often asks what component best fits a requirement, so focus on the job being performed rather than the brand or shape of the device.",
              "A switch connects devices inside a local network and forwards frames using MAC addresses. A router connects different IP networks and forwards packets using routing information. A wireless access point bridges wireless clients into the wired network. A controller can centrally manage access points or other infrastructure. A multilayer switch may combine switching and routing.",
              "A firewall permits or denies traffic according to policy. An intrusion detection system observes traffic and alerts on suspicious patterns. An intrusion prevention system can block or modify traffic inline. A proxy makes requests on behalf of clients and can enforce policy, cache content, or hide internal client details. These devices are often placed at trust boundaries where inspection matters.",
              "A load balancer distributes client requests across multiple servers so one server does not carry all demand. A content delivery network places cached content closer to users. Quality of service marks or prioritizes traffic so voice, video, or critical applications behave better during congestion. Time to live limits how long a packet can circulate before being discarded.",
              "Network-attached storage provides file-level storage over the network. A storage area network provides block-level storage, often for servers. A virtual private network creates an encrypted tunnel across an untrusted network. These are not all “security devices,” but each changes how traffic, storage, or access is delivered.",
              "For Network+, be able to read a requirement and name the appliance or function that satisfies it. If the prompt says “split requests across web servers,” think load balancer. If it says “connect two subnets,” think router or Layer 3 switch. If it says “detect malicious traffic without blocking,” think IDS. If it says “encrypted remote tunnel,” think VPN."
            ]
          },
          {
            "id": "n12-network-appliances-and-functions-scenario",
            "type": "scenario",
            "title": "Worked scenario - Network Appliances and Functions",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.2",
            "difficulty": "foundation",
            "summary": "Apply network appliances and functions to a realistic Network+ decision.",
            "evidence": [
              "A web app becomes slow during traffic spikes even though all back-end servers are healthy.",
              "The objective evidence should let the technician confirm the needed network function before selecting the device.",
              "The decision should preserve service while narrowing network appliances and functions to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "A load balancer to distribute client requests across multiple back-end servers.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician confirm the needed network function before selecting the device.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Network Appliances and Functions scenario is testing objective 1.2. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n12-network-appliances-and-functions-cards",
            "type": "flashcards",
            "title": "Network Appliances and Functions flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.2",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.2.",
            "cards": [
              [
                "Router",
                "Forwards packets between IP networks."
              ],
              [
                "Switch",
                "Forwards frames inside a local network using MAC addresses."
              ],
              [
                "Firewall",
                "Enforces traffic policy between networks or zones."
              ],
              [
                "IDS",
                "Detects suspicious traffic and alerts without necessarily blocking."
              ],
              [
                "IPS",
                "Inspects inline and can block suspicious traffic."
              ],
              [
                "Load balancer",
                "Distributes requests across multiple back-end systems."
              ],
              [
                "Proxy",
                "Makes requests on behalf of clients and can enforce policy."
              ],
              [
                "NAS",
                "File-level network storage."
              ],
              [
                "SAN",
                "Block-level storage network, commonly used by servers."
              ],
              [
                "VPN",
                "Encrypted tunnel across an untrusted network."
              ],
              [
                "QoS",
                "Traffic marking or prioritization to protect important flows."
              ],
              [
                "TTL",
                "Packet lifetime field that prevents endless circulation."
              ]
            ]
          },
          {
            "id": "n12-network-appliances-and-functions-check",
            "type": "quiz",
            "title": "Network Appliances and Functions coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.2",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.2.",
            "questions": [
              {
                "id": "check-n12-network-appliances-and-functions-001",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Router?",
                "options": [
                  "Forwards packets between IP networks.",
                  "Enforces traffic policy between networks or zones.",
                  "Inspects inline and can block suspicious traffic.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 1.2 because Forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n12-network-appliances-and-functions-002",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A web app becomes slow during traffic spikes even though all back-end servers are healthy. Which appliance function best fits the requirement?",
                "options": [
                  "An IDS to encrypt client sessions.",
                  "A NAS to route traffic between subnets.",
                  "A media converter to inspect application requests.",
                  "A load balancer to distribute client requests across multiple back-end servers."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.2, Network Appliances and Functions. A load balancer to distribute client requests across multiple back-end servers. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n12-network-appliances-and-functions-003",
                "objective": "1.2",
                "domain": 1,
                "prompt": "Before changing production settings for Network Appliances and Functions, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should confirm the needed network function before selecting the device.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.2: confirm the needed network function before selecting the device. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n12-network-appliances-and-functions-004",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A help desk note says: \"A web app becomes slow during traffic spikes even though all back-end servers are healthy.\" What is the best interpretation?",
                "options": [
                  "A media converter to inspect application requests.",
                  "A load balancer to distribute client requests across multiple back-end servers.",
                  "An IDS to encrypt client sessions.",
                  "A NAS to route traffic between subnets."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Appliances and Functions, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n12-network-appliances-and-functions-005",
                "objective": "1.2",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.2, Network Appliances and Functions?",
                "options": [
                  "Evidence that lets the technician confirm the needed network function before selecting the device.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Appliances and Functions, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n12-network-appliances-and-functions-quiz",
            "type": "quiz",
            "title": "Network Appliances and Functions section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.2",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.2.",
            "questions": [
              {
                "id": "quiz-n12-network-appliances-and-functions-001",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches TTL?",
                "options": [
                  "Packet lifetime field that prevents endless circulation.",
                  "Encrypted tunnel across an untrusted network.",
                  "File-level network storage.",
                  "Distributes requests across multiple back-end systems."
                ],
                "correctIndex": 0,
                "explanation": "TTL matters in objective 1.2 because Packet lifetime field that prevents endless circulation. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-002",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A web app becomes slow during traffic spikes even though all back-end servers are healthy. Which appliance function best fits the requirement?",
                "options": [
                  "An IDS to encrypt client sessions.",
                  "A NAS to route traffic between subnets.",
                  "A media converter to inspect application requests.",
                  "A load balancer to distribute client requests across multiple back-end servers."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.2, Network Appliances and Functions. A load balancer to distribute client requests across multiple back-end servers. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-003",
                "objective": "1.2",
                "domain": 1,
                "prompt": "Before changing production settings for Network Appliances and Functions, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should confirm the needed network function before selecting the device.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.2: confirm the needed network function before selecting the device. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-004",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A help desk note says: \"A web app becomes slow during traffic spikes even though all back-end servers are healthy.\" What is the best interpretation?",
                "options": [
                  "A media converter to inspect application requests.",
                  "A load balancer to distribute client requests across multiple back-end servers.",
                  "An IDS to encrypt client sessions.",
                  "A NAS to route traffic between subnets."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Appliances and Functions, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-005",
                "objective": "1.2",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.2, Network Appliances and Functions?",
                "options": [
                  "Evidence that lets the technician confirm the needed network function before selecting the device.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Appliances and Functions, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-006",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Proxy?",
                "options": [
                  "Inspects inline and can block suspicious traffic.",
                  "Enforces traffic policy between networks or zones.",
                  "Forwards packets between IP networks.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 3,
                "explanation": "Proxy matters in objective 1.2 because Makes requests on behalf of clients and can enforce policy. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-007",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A web app becomes slow during traffic spikes even though all back-end servers are healthy. Which appliance function best fits the requirement?",
                "options": [
                  "A NAS to route traffic between subnets.",
                  "A media converter to inspect application requests.",
                  "A load balancer to distribute client requests across multiple back-end servers.",
                  "An IDS to encrypt client sessions."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.2, Network Appliances and Functions. A load balancer to distribute client requests across multiple back-end servers. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-008",
                "objective": "1.2",
                "domain": 1,
                "prompt": "Before changing production settings for Network Appliances and Functions, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should confirm the needed network function before selecting the device.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.2: confirm the needed network function before selecting the device. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-009",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A help desk note says: \"A web app becomes slow during traffic spikes even though all back-end servers are healthy.\" What is the best interpretation?",
                "options": [
                  "A load balancer to distribute client requests across multiple back-end servers.",
                  "An IDS to encrypt client sessions.",
                  "A NAS to route traffic between subnets.",
                  "A media converter to inspect application requests."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Appliances and Functions, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n12-network-appliances-and-functions-010",
                "objective": "1.2",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.2, Network Appliances and Functions?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician confirm the needed network function before selecting the device."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Appliances and Functions, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n13-cloud-concepts-and-connectivity-section",
        "title": "Section 1.3 - Cloud Concepts and Connectivity",
        "summary": "Explain cloud networking components, deployment models, service models, scaling behavior, and connectivity options.",
        "activities": [
          {
            "id": "n13-cloud-concepts-and-connectivity-lesson",
            "type": "lesson",
            "title": "Cloud Concepts and Connectivity",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.3",
            "difficulty": "foundation",
            "summary": "Explain cloud networking components, deployment models, service models, scaling behavior, and connectivity options.",
            "learningObjectives": [
              "Describe VPCs, cloud gateways, and cloud security controls",
              "Compare public, private, and hybrid cloud",
              "Choose between VPN and dedicated cloud connectivity"
            ],
            "headings": [
              "Cloud networking in plain language",
              "Cloud boundaries and gateways",
              "Security groups and security lists",
              "Deployment and service models",
              "Scaling and tenancy",
              "Mastery target"
            ],
            "content": [
              "Cloud networking is still networking. The difference is that many routers, firewalls, load balancers, and network segments are software-defined and managed through a cloud control plane. A virtual private cloud is a logically isolated network space where you place subnets, route tables, gateways, and security rules.",
              "An internet gateway lets cloud resources communicate with the public internet when routing and policy allow it. A NAT gateway lets private resources initiate outbound internet connections without exposing inbound public access. A cloud gateway can connect cloud networks to other cloud or on-premises networks. Direct cloud connectivity services provide private dedicated links instead of using the public internet.",
              "Cloud security groups usually act like stateful virtual firewalls attached to instances or interfaces. Network security lists or network ACLs often act at a subnet boundary and may be stateless depending on the provider. The exam wants you to understand that both are policy controls, but they may apply at different scopes and behave differently.",
              "Public cloud is provider-owned shared infrastructure. Private cloud is dedicated to one organization. Hybrid cloud combines on-premises or private environments with public cloud. Software as a service delivers a finished application. Platform as a service gives a managed runtime for applications. Infrastructure as a service gives compute, network, and storage building blocks.",
              "Scalability means a design can grow. Elasticity means capacity can expand and contract automatically with demand. Multitenancy means multiple customers share provider infrastructure while remaining logically separated. These ideas matter because the network must support changing workloads, identity boundaries, and policy automation.",
              "For Network+, know which cloud component solves which connectivity problem. Use VPN for encrypted connectivity over the internet. Use dedicated connectivity when performance, consistency, or private routing matters. Use security groups, route tables, and gateways together; one correct piece rarely works alone."
            ]
          },
          {
            "id": "n13-cloud-concepts-and-connectivity-scenario",
            "type": "scenario",
            "title": "Worked scenario - Cloud Concepts and Connectivity",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.3",
            "difficulty": "foundation",
            "summary": "Apply cloud concepts and connectivity to a realistic Network+ decision.",
            "evidence": [
              "A private subnet in a cloud VPC must download updates without accepting inbound internet connections.",
              "The objective evidence should let the technician compare route tables, security policy, and gateway placement.",
              "The decision should preserve service while narrowing cloud concepts and connectivity to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "A NAT gateway or equivalent outbound translation service.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician compare route tables, security policy, and gateway placement.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Cloud Concepts and Connectivity scenario is testing objective 1.3. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n13-cloud-concepts-and-connectivity-cards",
            "type": "flashcards",
            "title": "Cloud Concepts and Connectivity flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.3",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.3.",
            "cards": [
              [
                "VPC",
                "Logically isolated cloud network."
              ],
              [
                "Security group",
                "Stateful cloud traffic policy often applied to an instance or interface."
              ],
              [
                "Security list",
                "Cloud network policy often applied at subnet level."
              ],
              [
                "Internet gateway",
                "Cloud gateway for public internet routing."
              ],
              [
                "NAT gateway",
                "Allows private cloud resources to initiate outbound internet access."
              ],
              [
                "VPN to cloud",
                "Encrypted tunnel between environments."
              ],
              [
                "Dedicated cloud connection",
                "Private connectivity to a cloud provider."
              ],
              [
                "Public cloud",
                "Provider-owned shared cloud service."
              ],
              [
                "Private cloud",
                "Cloud environment dedicated to one organization."
              ],
              [
                "Hybrid cloud",
                "Combination of private/on-premises and public cloud."
              ],
              [
                "Elasticity",
                "Automatic expansion and contraction with demand."
              ],
              [
                "Multitenancy",
                "Multiple customers share infrastructure with logical separation."
              ]
            ]
          },
          {
            "id": "n13-cloud-concepts-and-connectivity-check",
            "type": "quiz",
            "title": "Cloud Concepts and Connectivity coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.3",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.3.",
            "questions": [
              {
                "id": "check-n13-cloud-concepts-and-connectivity-001",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches VPC?",
                "options": [
                  "Logically isolated cloud network.",
                  "Cloud network policy often applied at subnet level.",
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 0,
                "explanation": "VPC matters in objective 1.3 because Logically isolated cloud network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n13-cloud-concepts-and-connectivity-002",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A private subnet in a cloud VPC must download updates without accepting inbound internet connections. Which cloud connectivity component best meets the need?",
                "options": [
                  "A public IP on every instance.",
                  "A security group rule that allows all inbound traffic.",
                  "A cold site in another region.",
                  "A NAT gateway or equivalent outbound translation service."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.3, Cloud Concepts and Connectivity. A NAT gateway or equivalent outbound translation service. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n13-cloud-concepts-and-connectivity-003",
                "objective": "1.3",
                "domain": 1,
                "prompt": "Before changing production settings for Cloud Concepts and Connectivity, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare route tables, security policy, and gateway placement.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.3: compare route tables, security policy, and gateway placement. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n13-cloud-concepts-and-connectivity-004",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A help desk note says: \"A private subnet in a cloud VPC must download updates without accepting inbound internet connections.\" What is the best interpretation?",
                "options": [
                  "A cold site in another region.",
                  "A NAT gateway or equivalent outbound translation service.",
                  "A public IP on every instance.",
                  "A security group rule that allows all inbound traffic."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Cloud Concepts and Connectivity, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n13-cloud-concepts-and-connectivity-005",
                "objective": "1.3",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.3, Cloud Concepts and Connectivity?",
                "options": [
                  "Evidence that lets the technician compare route tables, security policy, and gateway placement.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Cloud Concepts and Connectivity, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n13-cloud-concepts-and-connectivity-quiz",
            "type": "quiz",
            "title": "Cloud Concepts and Connectivity section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.3",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.3.",
            "questions": [
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-001",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches Multitenancy?",
                "options": [
                  "Multiple customers share infrastructure with logical separation.",
                  "Combination of private/on-premises and public cloud.",
                  "Provider-owned shared cloud service.",
                  "Encrypted tunnel between environments."
                ],
                "correctIndex": 0,
                "explanation": "Multitenancy matters in objective 1.3 because Multiple customers share infrastructure with logical separation. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-002",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A private subnet in a cloud VPC must download updates without accepting inbound internet connections. Which cloud connectivity component best meets the need?",
                "options": [
                  "A public IP on every instance.",
                  "A security group rule that allows all inbound traffic.",
                  "A cold site in another region.",
                  "A NAT gateway or equivalent outbound translation service."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.3, Cloud Concepts and Connectivity. A NAT gateway or equivalent outbound translation service. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-003",
                "objective": "1.3",
                "domain": 1,
                "prompt": "Before changing production settings for Cloud Concepts and Connectivity, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare route tables, security policy, and gateway placement.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.3: compare route tables, security policy, and gateway placement. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-004",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A help desk note says: \"A private subnet in a cloud VPC must download updates without accepting inbound internet connections.\" What is the best interpretation?",
                "options": [
                  "A cold site in another region.",
                  "A NAT gateway or equivalent outbound translation service.",
                  "A public IP on every instance.",
                  "A security group rule that allows all inbound traffic."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Cloud Concepts and Connectivity, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-005",
                "objective": "1.3",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.3, Cloud Concepts and Connectivity?",
                "options": [
                  "Evidence that lets the technician compare route tables, security policy, and gateway placement.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Cloud Concepts and Connectivity, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-006",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches Dedicated cloud connection?",
                "options": [
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Cloud network policy often applied at subnet level.",
                  "Logically isolated cloud network.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 3,
                "explanation": "Dedicated cloud connection matters in objective 1.3 because Private connectivity to a cloud provider. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-007",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A private subnet in a cloud VPC must download updates without accepting inbound internet connections. Which cloud connectivity component best meets the need?",
                "options": [
                  "A security group rule that allows all inbound traffic.",
                  "A cold site in another region.",
                  "A NAT gateway or equivalent outbound translation service.",
                  "A public IP on every instance."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.3, Cloud Concepts and Connectivity. A NAT gateway or equivalent outbound translation service. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-008",
                "objective": "1.3",
                "domain": 1,
                "prompt": "Before changing production settings for Cloud Concepts and Connectivity, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare route tables, security policy, and gateway placement.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.3: compare route tables, security policy, and gateway placement. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-009",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A help desk note says: \"A private subnet in a cloud VPC must download updates without accepting inbound internet connections.\" What is the best interpretation?",
                "options": [
                  "A NAT gateway or equivalent outbound translation service.",
                  "A public IP on every instance.",
                  "A security group rule that allows all inbound traffic.",
                  "A cold site in another region."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Cloud Concepts and Connectivity, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n13-cloud-concepts-and-connectivity-010",
                "objective": "1.3",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.3, Cloud Concepts and Connectivity?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician compare route tables, security policy, and gateway placement."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Cloud Concepts and Connectivity, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n14-ports-protocols-services-and-traffic-section",
        "title": "Section 1.4 - Ports, Protocols, Services, and Traffic",
        "summary": "Recognize common network services, port numbers, transport behavior, IP protocol types, and traffic delivery patterns.",
        "activities": [
          {
            "id": "n14-ports-protocols-services-and-traffic-lesson",
            "type": "lesson",
            "title": "Ports, Protocols, Services, and Traffic",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.4",
            "difficulty": "foundation",
            "summary": "Recognize common network services, port numbers, transport behavior, IP protocol types, and traffic delivery patterns.",
            "learningObjectives": [
              "Identify high-value Network+ ports and services",
              "Separate TCP, UDP, ICMP, GRE, and IPSec behavior",
              "Explain unicast, multicast, anycast, and broadcast"
            ],
            "headings": [
              "Why ports matter",
              "Core service ports",
              "Transport and IP protocol behavior",
              "Secure and management protocols",
              "Traffic delivery types",
              "Mastery target"
            ],
            "content": [
              "Ports identify application conversations on a host. An IP address gets traffic to a system; a port helps deliver it to the correct service on that system. When a firewall rule allows TCP 443, it is allowing HTTPS-style web traffic to a service listening on that port. Port knowledge helps you diagnose failed applications and write better access rules.",
              "High-frequency ports include FTP 20 and 21, SSH and SFTP 22, Telnet 23, SMTP 25, DNS 53, DHCP 67 and 68, TFTP 69, HTTP 80, NTP 123, SNMP 161 and 162, LDAP 389, HTTPS 443, SMB 445, Syslog 514, SMTPS 587, LDAPS 636, SQL Server 1433, RDP 3389, and SIP 5060 or 5061. You do not need to love memorization, but you do need fast recognition.",
              "TCP is connection-oriented and tracks sessions with acknowledgments and sequencing. UDP is connectionless and has less overhead, which is why it appears in services where speed or simplicity matters. ICMP carries control and diagnostic messages such as ping responses. GRE encapsulates traffic. IPSec secures IP traffic using components such as AH, ESP, and IKE.",
              "Secure protocols usually add encryption or stronger authentication to older ideas. SSH replaces Telnet for remote command-line administration. HTTPS protects web traffic. SFTP uses SSH for secure file transfer. LDAPS protects LDAP directory queries. SNMPv3 is preferred over older SNMP versions because it can provide authentication and encryption.",
              "Unicast is one sender to one receiver. Broadcast is one sender to all hosts in a broadcast domain. Multicast is one sender to interested receivers that joined a group. Anycast uses the same destination address in multiple locations and routes the client to a nearby or best instance. These patterns shape routing, discovery, streaming, and service resilience.",
              "For Network+, practice ports in context. If clients cannot get addresses, think DHCP 67 and 68. If names fail, think DNS 53. If remote desktop fails, think RDP 3389 and firewall policy. If time is wrong, think NTP 123. The port number is not the whole answer; it points you toward the service to verify."
            ]
          },
          {
            "id": "n14-ports-protocols-services-and-traffic-scenario",
            "type": "scenario",
            "title": "Worked scenario - Ports, Protocols, Services, and Traffic",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.4",
            "difficulty": "foundation",
            "summary": "Apply ports, protocols, services, and traffic to a realistic Network+ decision.",
            "evidence": [
              "Users can reach a server by IP address, but the application name no longer resolves.",
              "The objective evidence should let the technician test the specific port, protocol, and service implied by the symptom.",
              "The decision should preserve service while narrowing ports, protocols, services, and traffic to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "DNS, because name resolution is failing while IP reachability still works.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician test the specific port, protocol, and service implied by the symptom.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Ports, Protocols, Services, and Traffic scenario is testing objective 1.4. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n14-ports-protocols-services-and-traffic-cards",
            "type": "flashcards",
            "title": "Ports, Protocols, Services, and Traffic flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.4",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.4.",
            "cards": [
              [
                "FTP",
                "File transfer protocol using ports 20 and 21."
              ],
              [
                "SSH",
                "Secure remote shell using port 22."
              ],
              [
                "DNS",
                "Name resolution service using port 53."
              ],
              [
                "DHCP",
                "Address assignment service using ports 67 and 68."
              ],
              [
                "HTTP",
                "Web traffic using port 80."
              ],
              [
                "HTTPS",
                "Encrypted web traffic using port 443."
              ],
              [
                "SNMP",
                "Monitoring protocol using ports 161 and 162."
              ],
              [
                "SMB",
                "File sharing protocol using port 445."
              ],
              [
                "RDP",
                "Remote Desktop Protocol using port 3389."
              ],
              [
                "TCP",
                "Connection-oriented transport protocol."
              ],
              [
                "UDP",
                "Connectionless transport protocol."
              ],
              [
                "Anycast",
                "Routes a client to one of several destinations sharing an address."
              ]
            ]
          },
          {
            "id": "n14-ports-protocols-services-and-traffic-check",
            "type": "quiz",
            "title": "Ports, Protocols, Services, and Traffic coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.4",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.4.",
            "questions": [
              {
                "id": "check-n14-ports-protocols-services-and-traffic-001",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches FTP?",
                "options": [
                  "File transfer protocol using ports 20 and 21.",
                  "Name resolution service using port 53.",
                  "Web traffic using port 80.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 0,
                "explanation": "FTP matters in objective 1.4 because File transfer protocol using ports 20 and 21. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n14-ports-protocols-services-and-traffic-002",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Users can reach a server by IP address, but the application name no longer resolves. Which protocol or service should be checked first?",
                "options": [
                  "FTP, because all server access uses file transfer.",
                  "RDP, because the server has an IP address.",
                  "SNMP, because every failed lookup is a monitoring issue.",
                  "DNS, because name resolution is failing while IP reachability still works."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.4, Ports, Protocols, Services, and Traffic. DNS, because name resolution is failing while IP reachability still works. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n14-ports-protocols-services-and-traffic-003",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Before changing production settings for Ports, Protocols, Services, and Traffic, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should test the specific port, protocol, and service implied by the symptom.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.4: test the specific port, protocol, and service implied by the symptom. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n14-ports-protocols-services-and-traffic-004",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A help desk note says: \"Users can reach a server by IP address, but the application name no longer resolves.\" What is the best interpretation?",
                "options": [
                  "SNMP, because every failed lookup is a monitoring issue.",
                  "DNS, because name resolution is failing while IP reachability still works.",
                  "FTP, because all server access uses file transfer.",
                  "RDP, because the server has an IP address."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Ports, Protocols, Services, and Traffic, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n14-ports-protocols-services-and-traffic-005",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.4, Ports, Protocols, Services, and Traffic?",
                "options": [
                  "Evidence that lets the technician test the specific port, protocol, and service implied by the symptom.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Ports, Protocols, Services, and Traffic, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n14-ports-protocols-services-and-traffic-quiz",
            "type": "quiz",
            "title": "Ports, Protocols, Services, and Traffic section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.4",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.4.",
            "questions": [
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-001",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches Anycast?",
                "options": [
                  "Routes a client to one of several destinations sharing an address.",
                  "Connection-oriented transport protocol.",
                  "File sharing protocol using port 445.",
                  "Encrypted web traffic using port 443."
                ],
                "correctIndex": 0,
                "explanation": "Anycast matters in objective 1.4 because Routes a client to one of several destinations sharing an address. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-002",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Users can reach a server by IP address, but the application name no longer resolves. Which protocol or service should be checked first?",
                "options": [
                  "FTP, because all server access uses file transfer.",
                  "RDP, because the server has an IP address.",
                  "SNMP, because every failed lookup is a monitoring issue.",
                  "DNS, because name resolution is failing while IP reachability still works."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.4, Ports, Protocols, Services, and Traffic. DNS, because name resolution is failing while IP reachability still works. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-003",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Before changing production settings for Ports, Protocols, Services, and Traffic, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should test the specific port, protocol, and service implied by the symptom.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.4: test the specific port, protocol, and service implied by the symptom. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-004",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A help desk note says: \"Users can reach a server by IP address, but the application name no longer resolves.\" What is the best interpretation?",
                "options": [
                  "SNMP, because every failed lookup is a monitoring issue.",
                  "DNS, because name resolution is failing while IP reachability still works.",
                  "FTP, because all server access uses file transfer.",
                  "RDP, because the server has an IP address."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Ports, Protocols, Services, and Traffic, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-005",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.4, Ports, Protocols, Services, and Traffic?",
                "options": [
                  "Evidence that lets the technician test the specific port, protocol, and service implied by the symptom.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Ports, Protocols, Services, and Traffic, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-006",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches SNMP?",
                "options": [
                  "Web traffic using port 80.",
                  "Name resolution service using port 53.",
                  "File transfer protocol using ports 20 and 21.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 3,
                "explanation": "SNMP matters in objective 1.4 because Monitoring protocol using ports 161 and 162. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-007",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Users can reach a server by IP address, but the application name no longer resolves. Which protocol or service should be checked first?",
                "options": [
                  "RDP, because the server has an IP address.",
                  "SNMP, because every failed lookup is a monitoring issue.",
                  "DNS, because name resolution is failing while IP reachability still works.",
                  "FTP, because all server access uses file transfer."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.4, Ports, Protocols, Services, and Traffic. DNS, because name resolution is failing while IP reachability still works. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-008",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Before changing production settings for Ports, Protocols, Services, and Traffic, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should test the specific port, protocol, and service implied by the symptom.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.4: test the specific port, protocol, and service implied by the symptom. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-009",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A help desk note says: \"Users can reach a server by IP address, but the application name no longer resolves.\" What is the best interpretation?",
                "options": [
                  "DNS, because name resolution is failing while IP reachability still works.",
                  "FTP, because all server access uses file transfer.",
                  "RDP, because the server has an IP address.",
                  "SNMP, because every failed lookup is a monitoring issue."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Ports, Protocols, Services, and Traffic, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n14-ports-protocols-services-and-traffic-010",
                "objective": "1.4",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.4, Ports, Protocols, Services, and Traffic?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician test the specific port, protocol, and service implied by the symptom."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Ports, Protocols, Services, and Traffic, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n15-transmission-media-and-transceivers-section",
        "title": "Section 1.5 - Transmission Media and Transceivers",
        "summary": "Compare copper, fiber, wireless, and transceiver choices based on speed, distance, interference, and connector needs.",
        "activities": [
          {
            "id": "n15-transmission-media-and-transceivers-lesson",
            "type": "lesson",
            "title": "Transmission Media and Transceivers",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.5",
            "difficulty": "foundation",
            "summary": "Compare copper, fiber, wireless, and transceiver choices based on speed, distance, interference, and connector needs.",
            "learningObjectives": [
              "Choose copper, fiber, or wireless for a scenario",
              "Explain transceiver form factors at a high level",
              "Recognize distance and interference tradeoffs"
            ],
            "headings": [
              "Media choices are design choices",
              "Copper cabling basics",
              "Fiber cabling basics",
              "Wireless and non-cabled media",
              "Transceivers and connectors",
              "Mastery target"
            ],
            "content": [
              "Transmission media is the path that carries network signals. Copper uses electrical signals, fiber uses light, and wireless uses radio frequency. The right answer depends on speed, distance, cost, environment, and susceptibility to interference.",
              "Twisted-pair Ethernet cabling is common for endpoint access. Cable category affects supported speed and distance. Poor termination, damaged pairs, and wrong cable type can cause errors even when link lights appear. Coaxial cable and BNC connectors are older but still appear in some specialized environments.",
              "Fiber handles longer distances and electromagnetic interference better than copper. Multimode fiber is common inside buildings and campuses. Single-mode fiber supports much longer distances. Connector and transceiver compatibility matters; the fiber type, wavelength, speed, and connector must line up.",
              "Wireless media includes Wi-Fi, cellular, and satellite. Wi-Fi is convenient but shared and affected by interference, channel overlap, distance, and obstacles. Cellular can support mobile or backup connectivity. Satellite reaches remote locations but may have higher latency and weather sensitivity.",
              "SFP, SFP+, QSFP, and related modules let network devices use different media and speeds. A switch port may accept a copper module or a fiber module, but the module must match the cable, speed, and peer device. Mismatched optics are a classic physical-layer problem.",
              "For Network+, choose media by reading constraints. Long distance and electrical noise point toward fiber. Cheap endpoint cabling points toward copper. Mobility points toward wireless. Remote backup may point toward cellular or satellite. Always verify physical compatibility before blaming upper layers."
            ]
          },
          {
            "id": "n15-transmission-media-and-transceivers-scenario",
            "type": "scenario",
            "title": "Worked scenario - Transmission Media and Transceivers",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.5",
            "difficulty": "foundation",
            "summary": "Apply transmission media and transceivers to a realistic Network+ decision.",
            "evidence": [
              "A new fiber link stays down after patching; both switches support the configured speed.",
              "The objective evidence should let the technician check media, connector, and transceiver compatibility before changing Layer 3.",
              "The decision should preserve service while narrowing transmission media and transceivers to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Fiber type, transceiver type, wavelength, polarity, and light levels.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician check media, connector, and transceiver compatibility before changing Layer 3.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Transmission Media and Transceivers scenario is testing objective 1.5. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n15-transmission-media-and-transceivers-cards",
            "type": "flashcards",
            "title": "Transmission Media and Transceivers flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.5",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.5.",
            "cards": [
              [
                "Twisted pair",
                "Copper Ethernet cable used for many LAN connections."
              ],
              [
                "Cable category",
                "Rating that affects supported Ethernet speed and distance."
              ],
              [
                "Multimode fiber",
                "Fiber used for shorter fiber runs, often inside buildings."
              ],
              [
                "Single-mode fiber",
                "Fiber used for long-distance runs."
              ],
              [
                "SFP",
                "Small form-factor pluggable transceiver module."
              ],
              [
                "QSFP",
                "Higher-density pluggable transceiver family."
              ],
              [
                "BNC",
                "Connector associated with coaxial cabling."
              ],
              [
                "Wi-Fi",
                "Wireless LAN based on 802.11 standards."
              ],
              [
                "Cellular",
                "Carrier wireless service useful for mobile or backup connectivity."
              ],
              [
                "Satellite",
                "Wireless service useful for remote locations with latency tradeoffs."
              ],
              [
                "EMI",
                "Electromagnetic interference that can affect copper signaling."
              ],
              [
                "Light level",
                "Fiber signal strength measurement useful for troubleshooting."
              ]
            ]
          },
          {
            "id": "n15-transmission-media-and-transceivers-check",
            "type": "quiz",
            "title": "Transmission Media and Transceivers coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.5",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.5.",
            "questions": [
              {
                "id": "check-n15-transmission-media-and-transceivers-001",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches Twisted pair?",
                "options": [
                  "Copper Ethernet cable used for many LAN connections.",
                  "Fiber used for shorter fiber runs, often inside buildings.",
                  "Small form-factor pluggable transceiver module.",
                  "Connector associated with coaxial cabling."
                ],
                "correctIndex": 0,
                "explanation": "Twisted pair matters in objective 1.5 because Copper Ethernet cable used for many LAN connections. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n15-transmission-media-and-transceivers-002",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A new fiber link stays down after patching; both switches support the configured speed. Which physical factor should be verified early?",
                "options": [
                  "DNS record TTL values.",
                  "Default gateway redundancy.",
                  "Wireless channel utilization.",
                  "Fiber type, transceiver type, wavelength, polarity, and light levels."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.5, Transmission Media and Transceivers. Fiber type, transceiver type, wavelength, polarity, and light levels. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n15-transmission-media-and-transceivers-003",
                "objective": "1.5",
                "domain": 1,
                "prompt": "Before changing production settings for Transmission Media and Transceivers, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check media, connector, and transceiver compatibility before changing Layer 3.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.5: check media, connector, and transceiver compatibility before changing Layer 3. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n15-transmission-media-and-transceivers-004",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A help desk note says: \"A new fiber link stays down after patching; both switches support the configured speed.\" What is the best interpretation?",
                "options": [
                  "Wireless channel utilization.",
                  "Fiber type, transceiver type, wavelength, polarity, and light levels.",
                  "DNS record TTL values.",
                  "Default gateway redundancy."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Transmission Media and Transceivers, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n15-transmission-media-and-transceivers-005",
                "objective": "1.5",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.5, Transmission Media and Transceivers?",
                "options": [
                  "Evidence that lets the technician check media, connector, and transceiver compatibility before changing Layer 3.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Transmission Media and Transceivers, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n15-transmission-media-and-transceivers-quiz",
            "type": "quiz",
            "title": "Transmission Media and Transceivers section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.5",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.5.",
            "questions": [
              {
                "id": "quiz-n15-transmission-media-and-transceivers-001",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches Light level?",
                "options": [
                  "Fiber signal strength measurement useful for troubleshooting.",
                  "Wireless service useful for remote locations with latency tradeoffs.",
                  "Wireless LAN based on 802.11 standards.",
                  "Higher-density pluggable transceiver family."
                ],
                "correctIndex": 0,
                "explanation": "Light level matters in objective 1.5 because Fiber signal strength measurement useful for troubleshooting. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-002",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A new fiber link stays down after patching; both switches support the configured speed. Which physical factor should be verified early?",
                "options": [
                  "DNS record TTL values.",
                  "Default gateway redundancy.",
                  "Wireless channel utilization.",
                  "Fiber type, transceiver type, wavelength, polarity, and light levels."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.5, Transmission Media and Transceivers. Fiber type, transceiver type, wavelength, polarity, and light levels. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-003",
                "objective": "1.5",
                "domain": 1,
                "prompt": "Before changing production settings for Transmission Media and Transceivers, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check media, connector, and transceiver compatibility before changing Layer 3.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.5: check media, connector, and transceiver compatibility before changing Layer 3. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-004",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A help desk note says: \"A new fiber link stays down after patching; both switches support the configured speed.\" What is the best interpretation?",
                "options": [
                  "Wireless channel utilization.",
                  "Fiber type, transceiver type, wavelength, polarity, and light levels.",
                  "DNS record TTL values.",
                  "Default gateway redundancy."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Transmission Media and Transceivers, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-005",
                "objective": "1.5",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.5, Transmission Media and Transceivers?",
                "options": [
                  "Evidence that lets the technician check media, connector, and transceiver compatibility before changing Layer 3.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Transmission Media and Transceivers, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-006",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches BNC?",
                "options": [
                  "Small form-factor pluggable transceiver module.",
                  "Fiber used for shorter fiber runs, often inside buildings.",
                  "Copper Ethernet cable used for many LAN connections.",
                  "Connector associated with coaxial cabling."
                ],
                "correctIndex": 3,
                "explanation": "BNC matters in objective 1.5 because Connector associated with coaxial cabling. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-007",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A new fiber link stays down after patching; both switches support the configured speed. Which physical factor should be verified early?",
                "options": [
                  "Default gateway redundancy.",
                  "Wireless channel utilization.",
                  "Fiber type, transceiver type, wavelength, polarity, and light levels.",
                  "DNS record TTL values."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.5, Transmission Media and Transceivers. Fiber type, transceiver type, wavelength, polarity, and light levels. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-008",
                "objective": "1.5",
                "domain": 1,
                "prompt": "Before changing production settings for Transmission Media and Transceivers, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check media, connector, and transceiver compatibility before changing Layer 3.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.5: check media, connector, and transceiver compatibility before changing Layer 3. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-009",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A help desk note says: \"A new fiber link stays down after patching; both switches support the configured speed.\" What is the best interpretation?",
                "options": [
                  "Fiber type, transceiver type, wavelength, polarity, and light levels.",
                  "DNS record TTL values.",
                  "Default gateway redundancy.",
                  "Wireless channel utilization."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Transmission Media and Transceivers, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n15-transmission-media-and-transceivers-010",
                "objective": "1.5",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.5, Transmission Media and Transceivers?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician check media, connector, and transceiver compatibility before changing Layer 3."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Transmission Media and Transceivers, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n16-topologies-architectures-and-network-types-section",
        "title": "Section 1.6 - Topologies, Architectures, and Network Types",
        "summary": "Explain network layouts, traffic patterns, architecture tiers, and network categories.",
        "activities": [
          {
            "id": "n16-topologies-architectures-and-network-types-lesson",
            "type": "lesson",
            "title": "Topologies, Architectures, and Network Types",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.6",
            "difficulty": "foundation",
            "summary": "Explain network layouts, traffic patterns, architecture tiers, and network categories.",
            "learningObjectives": [
              "Compare common physical and logical topologies",
              "Explain three-tier and spine-leaf ideas",
              "Match LAN, WAN, WLAN, MAN, and SAN to use cases"
            ],
            "headings": [
              "Topology describes relationships",
              "Classic topologies",
              "Enterprise architecture patterns",
              "Traffic flow language",
              "Network type vocabulary",
              "Mastery target"
            ],
            "content": [
              "A topology describes how network components relate. Physical topology is where cables, devices, and radios are placed. Logical topology is how traffic is expected to move. The two can differ; a physically star-wired network may have logical VLANs and routed boundaries that change traffic behavior.",
              "A star topology connects endpoints to a central device. Mesh provides multiple paths between nodes. Point-to-point connects two locations directly. Hub-and-spoke uses a central site or service to connect branches. Hybrid designs combine patterns because real networks must balance cost, resilience, and manageability.",
              "A three-tier campus design uses access, distribution, and core layers. Collapsed core combines core and distribution in smaller environments. Spine-and-leaf designs are common in data centers because every leaf switch has predictable paths to every spine switch, supporting east-west server traffic.",
              "North-south traffic moves into or out of a data center or major network zone. East-west traffic moves laterally inside a zone, such as server-to-server traffic. These terms matter because firewall placement, load balancing, and monitoring strategy depend on traffic direction.",
              "A LAN is a local area network. A WLAN is a wireless LAN. A WAN connects geographically separated networks. A MAN spans a metropolitan area. A SAN carries storage traffic. A CAN may describe a campus area network. These labels help you match scope and purpose.",
              "For Network+, do not memorize diagrams only. Ask what the topology is trying to accomplish: redundancy, simple management, predictable latency, branch connectivity, wireless access, or storage performance."
            ]
          },
          {
            "id": "n16-topologies-architectures-and-network-types-scenario",
            "type": "scenario",
            "title": "Worked scenario - Topologies, Architectures, and Network Types",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.6",
            "difficulty": "foundation",
            "summary": "Apply topologies, architectures, and network types to a realistic Network+ decision.",
            "evidence": [
              "A branch office should connect to headquarters through a central site instead of maintaining full branch-to-branch links.",
              "The objective evidence should let the technician match topology language to the required traffic pattern and resiliency model.",
              "The decision should preserve service while narrowing topologies, architectures, and network types to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Hub-and-spoke, because branches connect through a central hub.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician match topology language to the required traffic pattern and resiliency model.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Topologies, Architectures, and Network Types scenario is testing objective 1.6. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n16-topologies-architectures-and-network-types-cards",
            "type": "flashcards",
            "title": "Topologies, Architectures, and Network Types flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.6",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.6.",
            "cards": [
              [
                "Star topology",
                "Endpoints connect through a central device."
              ],
              [
                "Mesh topology",
                "Nodes have multiple interconnections for resilience."
              ],
              [
                "Point-to-point",
                "Direct connection between two endpoints or sites."
              ],
              [
                "Hub-and-spoke",
                "Branches connect through a central hub."
              ],
              [
                "Access layer",
                "Where endpoints attach to the network."
              ],
              [
                "Distribution layer",
                "Aggregation and policy layer in three-tier design."
              ],
              [
                "Core layer",
                "High-speed backbone layer."
              ],
              [
                "Spine-leaf",
                "Data center fabric with predictable leaf-to-spine paths."
              ],
              [
                "North-south traffic",
                "Traffic entering or leaving a major zone."
              ],
              [
                "East-west traffic",
                "Traffic moving laterally inside a zone."
              ],
              [
                "WAN",
                "Network connecting separated locations."
              ],
              [
                "SAN",
                "Storage area network."
              ]
            ]
          },
          {
            "id": "n16-topologies-architectures-and-network-types-check",
            "type": "quiz",
            "title": "Topologies, Architectures, and Network Types coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.6",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.6.",
            "questions": [
              {
                "id": "check-n16-topologies-architectures-and-network-types-001",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Topologies, Architectures, and Network Types. Which description correctly matches Star topology?",
                "options": [
                  "Endpoints connect through a central device.",
                  "Direct connection between two endpoints or sites.",
                  "Where endpoints attach to the network.",
                  "High-speed backbone layer."
                ],
                "correctIndex": 0,
                "explanation": "Star topology matters in objective 1.6 because Endpoints connect through a central device. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n16-topologies-architectures-and-network-types-002",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A branch office should connect to headquarters through a central site instead of maintaining full branch-to-branch links. Which architecture best describes the design?",
                "options": [
                  "Full mesh, because every branch has a direct link to every other branch.",
                  "Spine-leaf, because every WAN uses data center fabric terminology.",
                  "Ad hoc wireless, because no central design is needed.",
                  "Hub-and-spoke, because branches connect through a central hub."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.6, Topologies, Architectures, and Network Types. Hub-and-spoke, because branches connect through a central hub. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n16-topologies-architectures-and-network-types-003",
                "objective": "1.6",
                "domain": 1,
                "prompt": "Before changing production settings for Topologies, Architectures, and Network Types, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match topology language to the required traffic pattern and resiliency model.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.6: match topology language to the required traffic pattern and resiliency model. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n16-topologies-architectures-and-network-types-004",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A help desk note says: \"A branch office should connect to headquarters through a central site instead of maintaining full branch-to-branch links.\" What is the best interpretation?",
                "options": [
                  "Ad hoc wireless, because no central design is needed.",
                  "Hub-and-spoke, because branches connect through a central hub.",
                  "Full mesh, because every branch has a direct link to every other branch.",
                  "Spine-leaf, because every WAN uses data center fabric terminology."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Topologies, Architectures, and Network Types, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n16-topologies-architectures-and-network-types-005",
                "objective": "1.6",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.6, Topologies, Architectures, and Network Types?",
                "options": [
                  "Evidence that lets the technician match topology language to the required traffic pattern and resiliency model.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Topologies, Architectures, and Network Types, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n16-topologies-architectures-and-network-types-quiz",
            "type": "quiz",
            "title": "Topologies, Architectures, and Network Types section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.6",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.6.",
            "questions": [
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-001",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Topologies, Architectures, and Network Types. Which description correctly matches SAN?",
                "options": [
                  "Storage area network.",
                  "Traffic moving laterally inside a zone.",
                  "Data center fabric with predictable leaf-to-spine paths.",
                  "Aggregation and policy layer in three-tier design."
                ],
                "correctIndex": 0,
                "explanation": "SAN matters in objective 1.6 because Storage area network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-002",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A branch office should connect to headquarters through a central site instead of maintaining full branch-to-branch links. Which architecture best describes the design?",
                "options": [
                  "Full mesh, because every branch has a direct link to every other branch.",
                  "Spine-leaf, because every WAN uses data center fabric terminology.",
                  "Ad hoc wireless, because no central design is needed.",
                  "Hub-and-spoke, because branches connect through a central hub."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.6, Topologies, Architectures, and Network Types. Hub-and-spoke, because branches connect through a central hub. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-003",
                "objective": "1.6",
                "domain": 1,
                "prompt": "Before changing production settings for Topologies, Architectures, and Network Types, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match topology language to the required traffic pattern and resiliency model.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.6: match topology language to the required traffic pattern and resiliency model. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-004",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A help desk note says: \"A branch office should connect to headquarters through a central site instead of maintaining full branch-to-branch links.\" What is the best interpretation?",
                "options": [
                  "Ad hoc wireless, because no central design is needed.",
                  "Hub-and-spoke, because branches connect through a central hub.",
                  "Full mesh, because every branch has a direct link to every other branch.",
                  "Spine-leaf, because every WAN uses data center fabric terminology."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Topologies, Architectures, and Network Types, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-005",
                "objective": "1.6",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.6, Topologies, Architectures, and Network Types?",
                "options": [
                  "Evidence that lets the technician match topology language to the required traffic pattern and resiliency model.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Topologies, Architectures, and Network Types, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-006",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Topologies, Architectures, and Network Types. Which description correctly matches Core layer?",
                "options": [
                  "Where endpoints attach to the network.",
                  "Direct connection between two endpoints or sites.",
                  "Endpoints connect through a central device.",
                  "High-speed backbone layer."
                ],
                "correctIndex": 3,
                "explanation": "Core layer matters in objective 1.6 because High-speed backbone layer. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-007",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A branch office should connect to headquarters through a central site instead of maintaining full branch-to-branch links. Which architecture best describes the design?",
                "options": [
                  "Spine-leaf, because every WAN uses data center fabric terminology.",
                  "Ad hoc wireless, because no central design is needed.",
                  "Hub-and-spoke, because branches connect through a central hub.",
                  "Full mesh, because every branch has a direct link to every other branch."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.6, Topologies, Architectures, and Network Types. Hub-and-spoke, because branches connect through a central hub. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-008",
                "objective": "1.6",
                "domain": 1,
                "prompt": "Before changing production settings for Topologies, Architectures, and Network Types, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match topology language to the required traffic pattern and resiliency model.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.6: match topology language to the required traffic pattern and resiliency model. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-009",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A help desk note says: \"A branch office should connect to headquarters through a central site instead of maintaining full branch-to-branch links.\" What is the best interpretation?",
                "options": [
                  "Hub-and-spoke, because branches connect through a central hub.",
                  "Full mesh, because every branch has a direct link to every other branch.",
                  "Spine-leaf, because every WAN uses data center fabric terminology.",
                  "Ad hoc wireless, because no central design is needed."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Topologies, Architectures, and Network Types, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n16-topologies-architectures-and-network-types-010",
                "objective": "1.6",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.6, Topologies, Architectures, and Network Types?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician match topology language to the required traffic pattern and resiliency model."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Topologies, Architectures, and Network Types, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n17-ipv4-addressing-and-subnetting-section",
        "title": "Section 1.7 - IPv4 Addressing and Subnetting",
        "summary": "Teach IPv4 address structure, private ranges, masks, gateways, and subnet reasoning from the ground up.",
        "activities": [
          {
            "id": "n17-ipv4-addressing-and-subnetting-lesson",
            "type": "lesson",
            "title": "IPv4 Addressing and Subnetting",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.7",
            "difficulty": "foundation",
            "summary": "Teach IPv4 address structure, private ranges, masks, gateways, and subnet reasoning from the ground up.",
            "learningObjectives": [
              "Identify private and special IPv4 ranges",
              "Explain what a subnet mask does",
              "Find basic subnet and gateway mistakes"
            ],
            "headings": [
              "What an IPv4 address represents",
              "Private and special ranges",
              "Subnet masks and CIDR",
              "Default gateways",
              "Reading address problems",
              "Mastery target"
            ],
            "content": [
              "An IPv4 address is a 32-bit logical address usually written as four decimal numbers, such as 192.168.1.25. Hosts use it to identify a source and destination at Layer 3. The address alone is incomplete; a host also needs a subnet mask, default gateway, and usually DNS servers to communicate effectively.",
              "Private IPv4 ranges are not routed on the public internet: 10.0.0.0/8, 172.16.0.0 through 172.31.255.255, and 192.168.0.0/16. Loopback uses 127.0.0.0/8, commonly 127.0.0.1. APIPA uses 169.254.0.0/16 when a host cannot obtain DHCP configuration.",
              "A subnet mask tells the host which part of the address is the network and which part identifies hosts. CIDR notation writes the number of network bits after a slash. A /24 mask means the first 24 bits are the network portion, leaving 8 host bits. That gives 256 total addresses, with network and broadcast addresses not usable by hosts in traditional IPv4 subnets.",
              "The default gateway is the router address a host uses when the destination is outside the local subnet. If a host has the wrong gateway or the gateway is not in the local subnet, it may reach local neighbors but fail to reach other networks. This is one of the most common addressing failures.",
              "When troubleshooting IPv4, compare address, mask, gateway, and DHCP source. A 169.254 address suggests DHCP failure. Two hosts in different subnets may not communicate directly without routing. A duplicate IP can cause intermittent behavior. A wrong mask can make a host think a remote address is local or a local address is remote.",
              "For Network+, be comfortable with private ranges, CIDR basics, usable host ranges, and gateway logic. You do not need to become a subnetting wizard overnight, but you must be able to detect when addressing information does not belong together."
            ]
          },
          {
            "id": "n17-ipv4-addressing-and-subnetting-scenario",
            "type": "scenario",
            "title": "Worked scenario - IPv4 Addressing and Subnetting",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.7",
            "difficulty": "foundation",
            "summary": "Apply ipv4 addressing and subnetting to a realistic Network+ decision.",
            "evidence": [
              "A workstation shows 169.254.18.20 and cannot reach its default gateway.",
              "The objective evidence should let the technician compare address, mask, gateway, DHCP lease, and subnet membership.",
              "The decision should preserve service while narrowing ipv4 addressing and subnetting to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "The host self-assigned an APIPA address after failing to obtain DHCP configuration.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician compare address, mask, gateway, DHCP lease, and subnet membership.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This IPv4 Addressing and Subnetting scenario is testing objective 1.7. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n17-ipv4-addressing-and-subnetting-cards",
            "type": "flashcards",
            "title": "IPv4 Addressing and Subnetting flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.7",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.7.",
            "cards": [
              [
                "IPv4",
                "32-bit Layer 3 addressing system."
              ],
              [
                "Subnet mask",
                "Defines network and host portions of an IPv4 address."
              ],
              [
                "CIDR",
                "Slash notation for network prefix length."
              ],
              [
                "Private address",
                "RFC1918 address not routed on the public internet."
              ],
              [
                "10.0.0.0/8",
                "Private IPv4 range."
              ],
              [
                "172.16.0.0/12",
                "Private IPv4 range from 172.16 through 172.31."
              ],
              [
                "192.168.0.0/16",
                "Private IPv4 range."
              ],
              [
                "APIPA",
                "169.254.0.0/16 self-assigned range when DHCP fails."
              ],
              [
                "Loopback",
                "127.0.0.0/8 local host testing range."
              ],
              [
                "Default gateway",
                "Router used to reach remote networks."
              ],
              [
                "Network address",
                "Address representing the subnet itself."
              ],
              [
                "Broadcast address",
                "Address used to reach all hosts in an IPv4 subnet."
              ]
            ]
          },
          {
            "id": "n17-ipv4-addressing-and-subnetting-check",
            "type": "quiz",
            "title": "IPv4 Addressing and Subnetting coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.7",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.7.",
            "questions": [
              {
                "id": "check-n17-ipv4-addressing-and-subnetting-001",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing IPv4 Addressing and Subnetting. Which description correctly matches IPv4?",
                "options": [
                  "32-bit Layer 3 addressing system.",
                  "Slash notation for network prefix length.",
                  "Private IPv4 range from 172.16 through 172.31.",
                  "127.0.0.0/8 local host testing range."
                ],
                "correctIndex": 0,
                "explanation": "IPv4 matters in objective 1.7 because 32-bit Layer 3 addressing system. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n17-ipv4-addressing-and-subnetting-002",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A workstation shows 169.254.18.20 and cannot reach its default gateway. What does this address most strongly suggest?",
                "options": [
                  "The host received a public internet address.",
                  "The subnet mask is definitely /8.",
                  "The DNS server is working correctly.",
                  "The host self-assigned an APIPA address after failing to obtain DHCP configuration."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.7, IPv4 Addressing and Subnetting. The host self-assigned an APIPA address after failing to obtain DHCP configuration. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n17-ipv4-addressing-and-subnetting-003",
                "objective": "1.7",
                "domain": 1,
                "prompt": "Before changing production settings for IPv4 Addressing and Subnetting, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare address, mask, gateway, DHCP lease, and subnet membership.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.7: compare address, mask, gateway, DHCP lease, and subnet membership. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n17-ipv4-addressing-and-subnetting-004",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A help desk note says: \"A workstation shows 169.254.18.20 and cannot reach its default gateway.\" What is the best interpretation?",
                "options": [
                  "The DNS server is working correctly.",
                  "The host self-assigned an APIPA address after failing to obtain DHCP configuration.",
                  "The host received a public internet address.",
                  "The subnet mask is definitely /8."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For IPv4 Addressing and Subnetting, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n17-ipv4-addressing-and-subnetting-005",
                "objective": "1.7",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.7, IPv4 Addressing and Subnetting?",
                "options": [
                  "Evidence that lets the technician compare address, mask, gateway, DHCP lease, and subnet membership.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For IPv4 Addressing and Subnetting, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n17-ipv4-addressing-and-subnetting-quiz",
            "type": "quiz",
            "title": "IPv4 Addressing and Subnetting section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.7",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.7.",
            "questions": [
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-001",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing IPv4 Addressing and Subnetting. Which description correctly matches Broadcast address?",
                "options": [
                  "Address used to reach all hosts in an IPv4 subnet.",
                  "Router used to reach remote networks.",
                  "169.254.0.0/16 self-assigned range when DHCP fails.",
                  "RFC1918 address not routed on the public internet."
                ],
                "correctIndex": 0,
                "explanation": "Broadcast address matters in objective 1.7 because Address used to reach all hosts in an IPv4 subnet. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-002",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A workstation shows 169.254.18.20 and cannot reach its default gateway. What does this address most strongly suggest?",
                "options": [
                  "The host received a public internet address.",
                  "The subnet mask is definitely /8.",
                  "The DNS server is working correctly.",
                  "The host self-assigned an APIPA address after failing to obtain DHCP configuration."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.7, IPv4 Addressing and Subnetting. The host self-assigned an APIPA address after failing to obtain DHCP configuration. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-003",
                "objective": "1.7",
                "domain": 1,
                "prompt": "Before changing production settings for IPv4 Addressing and Subnetting, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare address, mask, gateway, DHCP lease, and subnet membership.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.7: compare address, mask, gateway, DHCP lease, and subnet membership. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-004",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A help desk note says: \"A workstation shows 169.254.18.20 and cannot reach its default gateway.\" What is the best interpretation?",
                "options": [
                  "The DNS server is working correctly.",
                  "The host self-assigned an APIPA address after failing to obtain DHCP configuration.",
                  "The host received a public internet address.",
                  "The subnet mask is definitely /8."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For IPv4 Addressing and Subnetting, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-005",
                "objective": "1.7",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.7, IPv4 Addressing and Subnetting?",
                "options": [
                  "Evidence that lets the technician compare address, mask, gateway, DHCP lease, and subnet membership.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For IPv4 Addressing and Subnetting, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-006",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing IPv4 Addressing and Subnetting. Which description correctly matches 172.16.0.0/12?",
                "options": [
                  "Slash notation for network prefix length.",
                  "32-bit Layer 3 addressing system.",
                  "Address representing the subnet itself.",
                  "Private IPv4 range from 172.16 through 172.31."
                ],
                "correctIndex": 3,
                "explanation": "172.16.0.0/12 matters in objective 1.7 because Private IPv4 range from 172.16 through 172.31. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-007",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A workstation shows 169.254.18.20 and cannot reach its default gateway. What does this address most strongly suggest?",
                "options": [
                  "The subnet mask is definitely /8.",
                  "The DNS server is working correctly.",
                  "The host self-assigned an APIPA address after failing to obtain DHCP configuration.",
                  "The host received a public internet address."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.7, IPv4 Addressing and Subnetting. The host self-assigned an APIPA address after failing to obtain DHCP configuration. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-008",
                "objective": "1.7",
                "domain": 1,
                "prompt": "Before changing production settings for IPv4 Addressing and Subnetting, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare address, mask, gateway, DHCP lease, and subnet membership.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.7: compare address, mask, gateway, DHCP lease, and subnet membership. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-009",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A help desk note says: \"A workstation shows 169.254.18.20 and cannot reach its default gateway.\" What is the best interpretation?",
                "options": [
                  "The host self-assigned an APIPA address after failing to obtain DHCP configuration.",
                  "The host received a public internet address.",
                  "The subnet mask is definitely /8.",
                  "The DNS server is working correctly."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For IPv4 Addressing and Subnetting, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n17-ipv4-addressing-and-subnetting-010",
                "objective": "1.7",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.7, IPv4 Addressing and Subnetting?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician compare address, mask, gateway, DHCP lease, and subnet membership."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For IPv4 Addressing and Subnetting, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n18-modern-network-environments-section",
        "title": "Section 1.8 - Modern Network Environments",
        "summary": "Explain SDN, SD-WAN, SASE/SSE, IPv6 drivers, and infrastructure as code.",
        "activities": [
          {
            "id": "n18-modern-network-environments-lesson",
            "type": "lesson",
            "title": "Modern Network Environments",
            "duration": 14,
            "required": true,
            "domain": 1,
            "objective": "1.8",
            "difficulty": "foundation",
            "summary": "Explain SDN, SD-WAN, SASE/SSE, IPv6 drivers, and infrastructure as code.",
            "learningObjectives": [
              "Explain software-defined networking at a high level",
              "Describe why SD-WAN and SASE exist",
              "Recognize automation and IPv6 drivers"
            ],
            "headings": [
              "Why networks became software-defined",
              "SDN and SD-WAN",
              "SASE and SSE",
              "IPv6 pressure",
              "Infrastructure as code",
              "Mastery target"
            ],
            "content": [
              "Modern networks change too quickly for every task to be a manual device-by-device change. Software-defined approaches separate intent and control from individual hardware interfaces, making policy, routing, and segmentation easier to automate and audit.",
              "Software-defined networking separates the control plane from the data plane. SD-WAN applies software-defined decisions to wide-area connectivity, often choosing paths based on application, performance, cost, and policy rather than static circuits alone.",
              "Secure Access Secure Edge combines network access and security functions in cloud-delivered services. Security Service Edge focuses on the security-service side, such as secure web gateway, cloud access security, and zero trust access. These models grew because users and applications are no longer only inside one office network.",
              "IPv6 reduces pressure from IPv4 address exhaustion and changes how addressing, neighbor discovery, and network design work. Network+ expects you to recognize why IPv6 exists and where it appears, even when a network still uses IPv4 heavily.",
              "Infrastructure as code describes managing network and cloud infrastructure with versioned definitions instead of ad hoc manual changes. It supports repeatability, review, rollback, and consistency. Automation does not remove the need to understand networking; it makes incorrect intent faster if nobody reviews it.",
              "For Network+, focus on the use case. SDN centralizes control. SD-WAN improves WAN path choice. SASE/SSE bring security closer to cloud and remote users. IPv6 addresses scale. Infrastructure as code makes change repeatable."
            ]
          },
          {
            "id": "n18-modern-network-environments-scenario",
            "type": "scenario",
            "title": "Worked scenario - Modern Network Environments",
            "duration": 10,
            "required": true,
            "domain": 1,
            "objective": "1.8",
            "difficulty": "foundation",
            "summary": "Apply modern network environments to a realistic Network+ decision.",
            "evidence": [
              "A company wants centralized policy control so forwarding devices follow intent from a controller.",
              "The objective evidence should let the technician distinguish control plane, data plane, automation, and policy intent.",
              "The decision should preserve service while narrowing modern network environments to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "SDN, because control decisions are centralized and forwarding is separated into the data plane.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician distinguish control plane, data plane, automation, and policy intent.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Modern Network Environments scenario is testing objective 1.8. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n18-modern-network-environments-cards",
            "type": "flashcards",
            "title": "Modern Network Environments flashcards",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.8",
            "difficulty": "foundation",
            "summary": "Practice the terms needed for objective 1.8.",
            "cards": [
              [
                "SDN",
                "Centralized software-defined network control."
              ],
              [
                "Control plane",
                "Decision-making part of networking."
              ],
              [
                "Data plane",
                "Packet forwarding part of networking."
              ],
              [
                "SD-WAN",
                "Software-defined WAN path and policy control."
              ],
              [
                "SASE",
                "Cloud-delivered network and security architecture."
              ],
              [
                "SSE",
                "Security-service side of SASE."
              ],
              [
                "IPv6",
                "128-bit IP addressing system."
              ],
              [
                "Address exhaustion",
                "Pressure caused by limited IPv4 space."
              ],
              [
                "Infrastructure as code",
                "Versioned definitions for infrastructure deployment."
              ],
              [
                "Automation",
                "Repeatable execution of network tasks."
              ],
              [
                "Policy intent",
                "Desired network behavior expressed centrally."
              ],
              [
                "Zero trust access",
                "Access model that verifies context instead of assuming trust."
              ]
            ]
          },
          {
            "id": "n18-modern-network-environments-check",
            "type": "quiz",
            "title": "Modern Network Environments coached check",
            "duration": 8,
            "required": true,
            "domain": 1,
            "objective": "1.8",
            "difficulty": "foundation",
            "summary": "Five coached questions for objective 1.8.",
            "questions": [
              {
                "id": "check-n18-modern-network-environments-001",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Modern Network Environments. Which description correctly matches SDN?",
                "options": [
                  "Centralized software-defined network control.",
                  "Packet forwarding part of networking.",
                  "Cloud-delivered network and security architecture.",
                  "128-bit IP addressing system."
                ],
                "correctIndex": 0,
                "explanation": "SDN matters in objective 1.8 because Centralized software-defined network control. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n18-modern-network-environments-002",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A company wants centralized policy control so forwarding devices follow intent from a controller. Which modern networking concept is being described?",
                "options": [
                  "APIPA, because addresses are self-assigned.",
                  "Coaxial Ethernet, because policy is carried in the cable.",
                  "A cold site, because controller-based policy is disaster recovery.",
                  "SDN, because control decisions are centralized and forwarding is separated into the data plane."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.8, Modern Network Environments. SDN, because control decisions are centralized and forwarding is separated into the data plane. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n18-modern-network-environments-003",
                "objective": "1.8",
                "domain": 1,
                "prompt": "Before changing production settings for Modern Network Environments, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should distinguish control plane, data plane, automation, and policy intent.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.8: distinguish control plane, data plane, automation, and policy intent. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n18-modern-network-environments-004",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A help desk note says: \"A company wants centralized policy control so forwarding devices follow intent from a controller.\" What is the best interpretation?",
                "options": [
                  "A cold site, because controller-based policy is disaster recovery.",
                  "SDN, because control decisions are centralized and forwarding is separated into the data plane.",
                  "APIPA, because addresses are self-assigned.",
                  "Coaxial Ethernet, because policy is carried in the cable."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Modern Network Environments, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n18-modern-network-environments-005",
                "objective": "1.8",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.8, Modern Network Environments?",
                "options": [
                  "Evidence that lets the technician distinguish control plane, data plane, automation, and policy intent.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Modern Network Environments, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n18-modern-network-environments-quiz",
            "type": "quiz",
            "title": "Modern Network Environments section quiz",
            "duration": 12,
            "required": true,
            "domain": 1,
            "objective": "1.8",
            "difficulty": "foundation",
            "summary": "Ten section quiz questions for objective 1.8.",
            "questions": [
              {
                "id": "quiz-n18-modern-network-environments-001",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Modern Network Environments. Which description correctly matches Zero trust access?",
                "options": [
                  "Access model that verifies context instead of assuming trust.",
                  "Repeatable execution of network tasks.",
                  "Pressure caused by limited IPv4 space.",
                  "Security-service side of SASE."
                ],
                "correctIndex": 0,
                "explanation": "Zero trust access matters in objective 1.8 because Access model that verifies context instead of assuming trust. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-002",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A company wants centralized policy control so forwarding devices follow intent from a controller. Which modern networking concept is being described?",
                "options": [
                  "APIPA, because addresses are self-assigned.",
                  "Coaxial Ethernet, because policy is carried in the cable.",
                  "A cold site, because controller-based policy is disaster recovery.",
                  "SDN, because control decisions are centralized and forwarding is separated into the data plane."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 1.8, Modern Network Environments. SDN, because control decisions are centralized and forwarding is separated into the data plane. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-003",
                "objective": "1.8",
                "domain": 1,
                "prompt": "Before changing production settings for Modern Network Environments, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should distinguish control plane, data plane, automation, and policy intent.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 1.8: distinguish control plane, data plane, automation, and policy intent. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-004",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A help desk note says: \"A company wants centralized policy control so forwarding devices follow intent from a controller.\" What is the best interpretation?",
                "options": [
                  "A cold site, because controller-based policy is disaster recovery.",
                  "SDN, because control decisions are centralized and forwarding is separated into the data plane.",
                  "APIPA, because addresses are self-assigned.",
                  "Coaxial Ethernet, because policy is carried in the cable."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Modern Network Environments, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-005",
                "objective": "1.8",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.8, Modern Network Environments?",
                "options": [
                  "Evidence that lets the technician distinguish control plane, data plane, automation, and policy intent.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Modern Network Environments, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-006",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Modern Network Environments. Which description correctly matches IPv6?",
                "options": [
                  "Cloud-delivered network and security architecture.",
                  "Packet forwarding part of networking.",
                  "Centralized software-defined network control.",
                  "128-bit IP addressing system."
                ],
                "correctIndex": 3,
                "explanation": "IPv6 matters in objective 1.8 because 128-bit IP addressing system. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-007",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A company wants centralized policy control so forwarding devices follow intent from a controller. Which modern networking concept is being described?",
                "options": [
                  "Coaxial Ethernet, because policy is carried in the cable.",
                  "A cold site, because controller-based policy is disaster recovery.",
                  "SDN, because control decisions are centralized and forwarding is separated into the data plane.",
                  "APIPA, because addresses are self-assigned."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 1.8, Modern Network Environments. SDN, because control decisions are centralized and forwarding is separated into the data plane. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-008",
                "objective": "1.8",
                "domain": 1,
                "prompt": "Before changing production settings for Modern Network Environments, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should distinguish control plane, data plane, automation, and policy intent.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 1.8: distinguish control plane, data plane, automation, and policy intent. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-009",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A help desk note says: \"A company wants centralized policy control so forwarding devices follow intent from a controller.\" What is the best interpretation?",
                "options": [
                  "SDN, because control decisions are centralized and forwarding is separated into the data plane.",
                  "APIPA, because addresses are self-assigned.",
                  "Coaxial Ethernet, because policy is carried in the cable.",
                  "A cold site, because controller-based policy is disaster recovery."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Modern Network Environments, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n18-modern-network-environments-010",
                "objective": "1.8",
                "domain": 1,
                "prompt": "Which evidence would most improve confidence when working through objective 1.8, Modern Network Environments?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician distinguish control plane, data plane, automation, and policy intent."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Modern Network Environments, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "t1-final-section",
        "title": "Tier 1 final checkpoint",
        "summary": "Mixed review for Networking Concepts.",
        "activities": [
          {
            "id": "t1-checkpoint",
            "type": "checkpoint",
            "title": "Tier 1 cumulative checkpoint",
            "duration": 25,
            "required": true,
            "domain": 1,
            "objective": "Tier 1 synthesis",
            "difficulty": "foundation",
            "summary": "Twenty mixed questions covering Networking Concepts.",
            "questions": [
              {
                "id": "checkpoint-tier-1-001-001",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 1 - Physical?",
                "options": [
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Establishing, maintaining, and ending conversations between systems.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 0,
                "explanation": "Layer 1 - Physical matters in objective 1.1 because it covers signals, media, connectors, transceivers, cabling, radio, and link lights. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-002-001",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Router?",
                "options": [
                  "Forwards packets between IP networks.",
                  "Enforces traffic policy between networks or zones.",
                  "Inspects inline and can block suspicious traffic.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 1.2 because Forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-003-001",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches VPC?",
                "options": [
                  "Logically isolated cloud network.",
                  "Cloud network policy often applied at subnet level.",
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 0,
                "explanation": "VPC matters in objective 1.3 because Logically isolated cloud network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-004-001",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches FTP?",
                "options": [
                  "File transfer protocol using ports 20 and 21.",
                  "Name resolution service using port 53.",
                  "Web traffic using port 80.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 0,
                "explanation": "FTP matters in objective 1.4 because File transfer protocol using ports 20 and 21. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-005-001",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches Twisted pair?",
                "options": [
                  "Copper Ethernet cable used for many LAN connections.",
                  "Fiber used for shorter fiber runs, often inside buildings.",
                  "Small form-factor pluggable transceiver module.",
                  "Connector associated with coaxial cabling."
                ],
                "correctIndex": 0,
                "explanation": "Twisted pair matters in objective 1.5 because Copper Ethernet cable used for many LAN connections. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-006-001",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Topologies, Architectures, and Network Types. Which description correctly matches Star topology?",
                "options": [
                  "Endpoints connect through a central device.",
                  "Direct connection between two endpoints or sites.",
                  "Where endpoints attach to the network.",
                  "High-speed backbone layer."
                ],
                "correctIndex": 0,
                "explanation": "Star topology matters in objective 1.6 because Endpoints connect through a central device. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-007-001",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing IPv4 Addressing and Subnetting. Which description correctly matches IPv4?",
                "options": [
                  "32-bit Layer 3 addressing system.",
                  "Slash notation for network prefix length.",
                  "Private IPv4 range from 172.16 through 172.31.",
                  "127.0.0.0/8 local host testing range."
                ],
                "correctIndex": 0,
                "explanation": "IPv4 matters in objective 1.7 because 32-bit Layer 3 addressing system. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-008-001",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Modern Network Environments. Which description correctly matches SDN?",
                "options": [
                  "Centralized software-defined network control.",
                  "Packet forwarding part of networking.",
                  "Cloud-delivered network and security architecture.",
                  "128-bit IP addressing system."
                ],
                "correctIndex": 0,
                "explanation": "SDN matters in objective 1.8 because Centralized software-defined network control. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-009-001",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 1 - Physical?",
                "options": [
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Establishing, maintaining, and ending conversations between systems.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 0,
                "explanation": "Layer 1 - Physical matters in objective 1.1 because it covers signals, media, connectors, transceivers, cabling, radio, and link lights. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-010-001",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Router?",
                "options": [
                  "Forwards packets between IP networks.",
                  "Enforces traffic policy between networks or zones.",
                  "Inspects inline and can block suspicious traffic.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 1.2 because Forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-011-001",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches VPC?",
                "options": [
                  "Logically isolated cloud network.",
                  "Cloud network policy often applied at subnet level.",
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 0,
                "explanation": "VPC matters in objective 1.3 because Logically isolated cloud network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-012-001",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches FTP?",
                "options": [
                  "File transfer protocol using ports 20 and 21.",
                  "Name resolution service using port 53.",
                  "Web traffic using port 80.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 0,
                "explanation": "FTP matters in objective 1.4 because File transfer protocol using ports 20 and 21. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-013-001",
                "objective": "1.5",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches Twisted pair?",
                "options": [
                  "Copper Ethernet cable used for many LAN connections.",
                  "Fiber used for shorter fiber runs, often inside buildings.",
                  "Small form-factor pluggable transceiver module.",
                  "Connector associated with coaxial cabling."
                ],
                "correctIndex": 0,
                "explanation": "Twisted pair matters in objective 1.5 because Copper Ethernet cable used for many LAN connections. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-014-001",
                "objective": "1.6",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Topologies, Architectures, and Network Types. Which description correctly matches Star topology?",
                "options": [
                  "Endpoints connect through a central device.",
                  "Direct connection between two endpoints or sites.",
                  "Where endpoints attach to the network.",
                  "High-speed backbone layer."
                ],
                "correctIndex": 0,
                "explanation": "Star topology matters in objective 1.6 because Endpoints connect through a central device. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-015-001",
                "objective": "1.7",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing IPv4 Addressing and Subnetting. Which description correctly matches IPv4?",
                "options": [
                  "32-bit Layer 3 addressing system.",
                  "Slash notation for network prefix length.",
                  "Private IPv4 range from 172.16 through 172.31.",
                  "127.0.0.0/8 local host testing range."
                ],
                "correctIndex": 0,
                "explanation": "IPv4 matters in objective 1.7 because 32-bit Layer 3 addressing system. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-016-001",
                "objective": "1.8",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Modern Network Environments. Which description correctly matches SDN?",
                "options": [
                  "Centralized software-defined network control.",
                  "Packet forwarding part of networking.",
                  "Cloud-delivered network and security architecture.",
                  "128-bit IP addressing system."
                ],
                "correctIndex": 0,
                "explanation": "SDN matters in objective 1.8 because Centralized software-defined network control. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-017-001",
                "objective": "1.1",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 1 - Physical?",
                "options": [
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Establishing, maintaining, and ending conversations between systems.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 0,
                "explanation": "Layer 1 - Physical matters in objective 1.1 because it covers signals, media, connectors, transceivers, cabling, radio, and link lights. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-018-001",
                "objective": "1.2",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Router?",
                "options": [
                  "Forwards packets between IP networks.",
                  "Enforces traffic policy between networks or zones.",
                  "Inspects inline and can block suspicious traffic.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 1.2 because Forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-019-001",
                "objective": "1.3",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches VPC?",
                "options": [
                  "Logically isolated cloud network.",
                  "Cloud network policy often applied at subnet level.",
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 0,
                "explanation": "VPC matters in objective 1.3 because Logically isolated cloud network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-1-020-001",
                "objective": "1.4",
                "domain": 1,
                "prompt": "A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches FTP?",
                "options": [
                  "File transfer protocol using ports 20 and 21.",
                  "Name resolution service using port 53.",
                  "Web traffic using port 80.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 0,
                "explanation": "FTP matters in objective 1.4 because File transfer protocol using ports 20 and 21. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tier-2",
    "number": 2,
    "title": "Network Implementation",
    "subtitle": "Go from zero to fluent in network implementation.",
    "difficulty": "developing",
    "color": "#60efff",
    "minutes": 233,
    "recommendedAfter": 1,
    "modules": [
      {
        "id": "n21-routing-technologies-section",
        "title": "Section 2.1 - Routing Technologies",
        "summary": "Explain routing choices, dynamic protocols, NAT/PAT, and first-hop redundancy.",
        "activities": [
          {
            "id": "n21-routing-technologies-lesson",
            "type": "lesson",
            "title": "Routing Technologies",
            "duration": 18,
            "required": true,
            "domain": 2,
            "objective": "2.1",
            "difficulty": "developing",
            "summary": "Routing is how traffic leaves one IP network and reaches another. A host can talk directly to devices in its own subnet, but traffic for a remote subnet is sent to a default gateway. The gateway is normally a router or Layer 3 switch interface that has routes telling it where to forward packets next.",
            "learningObjectives": [
              "Explain how routers move packets between networks",
              "Compare static routing, dynamic routing, NAT/PAT, and first-hop redundancy",
              "Use routing evidence to choose a safe implementation or troubleshooting step"
            ],
            "headings": [
              "What routing does",
              "Static and dynamic routes",
              "Route choice and default gateways",
              "NAT, PAT, and address translation",
              "Redundancy and troubleshooting evidence",
              "Mastery target"
            ],
            "content": [
              "Routing is how traffic leaves one IP network and reaches another. A host can talk directly to devices in its own subnet, but traffic for a remote subnet is sent to a default gateway. The gateway is normally a router or Layer 3 switch interface that has routes telling it where to forward packets next.",
              "A static route is manually configured by an administrator. It is predictable and useful for small networks, point-to-point links, default routes, or backup paths, but it does not automatically adapt when the network changes. Dynamic routing protocols let routers exchange reachability information so they can learn routes and react to failures. Network+ learners should know the purpose of dynamic routing even when vendor-specific configuration is not required.",
              "Route selection is based on the destination network, longest prefix match, administrative preference, metric, and route availability. A default route is the fallback route used when no more specific route matches. When a site can reach local resources but not the internet, the default route, upstream gateway, NAT, or firewall policy becomes important evidence.",
              "NAT changes IP address information as traffic crosses a boundary. Static NAT maps one inside address to one outside address. Dynamic NAT maps inside addresses to a pool. PAT, often called overload, lets many inside hosts share one public address by tracking transport ports. PAT is common on small office and edge networks because public IPv4 space is limited.",
              "Gateway redundancy prevents one failed router interface from becoming the whole site outage. First-hop redundancy protocols present a shared virtual gateway so hosts keep using the same gateway address while routers coordinate active and standby roles. Troubleshooting routing means comparing the host IP settings, local route table, router route table, next hop, NAT rule, and return path.",
              "Mastery means you can draw a packet path from host to gateway to next hop, explain why a route is selected, identify when NAT/PAT is required, and pick verification commands such as ping, traceroute, route display, interface status, and firewall/NAT logs before changing production routes."
            ]
          },
          {
            "id": "n21-routing-technologies-scenario",
            "type": "scenario",
            "title": "Worked scenario - Routing Technologies",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.1",
            "difficulty": "developing",
            "summary": "Apply routing technologies to a realistic Network+ decision.",
            "evidence": [
              "A host can reach local devices but cannot reach any remote subnet after its gateway was changed.",
              "The objective evidence should let the technician trace host gateway, route table, next hop, NAT, and return path.",
              "The decision should preserve service while narrowing routing technologies to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "The host default gateway and the router path for remote networks.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician trace host gateway, route table, next hop, NAT, and return path.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Routing Technologies scenario is testing objective 2.1. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n21-routing-technologies-cards",
            "type": "flashcards",
            "title": "Routing Technologies flashcards",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.1",
            "difficulty": "developing",
            "summary": "Practice the terms needed for objective 2.1.",
            "cards": [
              [
                "Router",
                "A Layer 3 device that forwards packets between IP networks."
              ],
              [
                "Default gateway",
                "The router address a host uses to reach remote networks."
              ],
              [
                "Static route",
                "A manually configured route to a destination network or default path."
              ],
              [
                "Dynamic routing",
                "Routers exchanging route information and adapting to topology changes."
              ],
              [
                "Metric",
                "A value used by routing protocols to prefer one path over another."
              ],
              [
                "Longest prefix match",
                "The most specific matching route is selected for a destination."
              ],
              [
                "Default route",
                "Fallback route used when no more specific route matches."
              ],
              [
                "NAT",
                "Translation that changes IP address information across a boundary."
              ],
              [
                "PAT",
                "Many inside hosts sharing one public IP by tracking port numbers."
              ],
              [
                "First-hop redundancy",
                "Shared virtual gateway behavior that survives a router failure."
              ],
              [
                "Route table",
                "The list of known destination networks and next hops."
              ],
              [
                "Traceroute",
                "A tool that reveals Layer 3 hops toward a destination."
              ]
            ]
          },
          {
            "id": "n21-routing-technologies-check",
            "type": "quiz",
            "title": "Routing Technologies coached check",
            "duration": 8,
            "required": true,
            "domain": 2,
            "objective": "2.1",
            "difficulty": "developing",
            "summary": "Five coached questions for objective 2.1.",
            "questions": [
              {
                "id": "check-n21-routing-technologies-001",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n21-routing-technologies-002",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A host can reach local devices but cannot reach any remote subnet after its gateway was changed. Which routing item should be verified first?",
                "options": [
                  "The wireless channel width.",
                  "The mail exchanger record.",
                  "The rack humidity sensor.",
                  "The host default gateway and the router path for remote networks."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.1, Routing Technologies. The host default gateway and the router path for remote networks. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n21-routing-technologies-003",
                "objective": "2.1",
                "domain": 2,
                "prompt": "Before changing production settings for Routing Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should trace host gateway, route table, next hop, NAT, and return path.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.1: trace host gateway, route table, next hop, NAT, and return path. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n21-routing-technologies-004",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A help desk note says: \"A host can reach local devices but cannot reach any remote subnet after its gateway was changed.\" What is the best interpretation?",
                "options": [
                  "The rack humidity sensor.",
                  "The host default gateway and the router path for remote networks.",
                  "The wireless channel width.",
                  "The mail exchanger record."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Routing Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n21-routing-technologies-005",
                "objective": "2.1",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.1, Routing Technologies?",
                "options": [
                  "Evidence that lets the technician trace host gateway, route table, next hop, NAT, and return path.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Routing Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n21-routing-technologies-quiz",
            "type": "quiz",
            "title": "Routing Technologies section quiz",
            "duration": 12,
            "required": true,
            "domain": 2,
            "objective": "2.1",
            "difficulty": "developing",
            "summary": "Ten section quiz questions for objective 2.1.",
            "questions": [
              {
                "id": "quiz-n21-routing-technologies-001",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Traceroute?",
                "options": [
                  "A tool that reveals Layer 3 hops toward a destination.",
                  "Shared virtual gateway behavior that survives a router failure.",
                  "Translation that changes IP address information across a boundary.",
                  "The most specific matching route is selected for a destination."
                ],
                "correctIndex": 0,
                "explanation": "Traceroute matters in objective 2.1 because A tool that reveals Layer 3 hops toward a destination. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-002",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A host can reach local devices but cannot reach any remote subnet after its gateway was changed. Which routing item should be verified first?",
                "options": [
                  "The wireless channel width.",
                  "The mail exchanger record.",
                  "The rack humidity sensor.",
                  "The host default gateway and the router path for remote networks."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.1, Routing Technologies. The host default gateway and the router path for remote networks. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-003",
                "objective": "2.1",
                "domain": 2,
                "prompt": "Before changing production settings for Routing Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should trace host gateway, route table, next hop, NAT, and return path.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.1: trace host gateway, route table, next hop, NAT, and return path. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-004",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A help desk note says: \"A host can reach local devices but cannot reach any remote subnet after its gateway was changed.\" What is the best interpretation?",
                "options": [
                  "The rack humidity sensor.",
                  "The host default gateway and the router path for remote networks.",
                  "The wireless channel width.",
                  "The mail exchanger record."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Routing Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-005",
                "objective": "2.1",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.1, Routing Technologies?",
                "options": [
                  "Evidence that lets the technician trace host gateway, route table, next hop, NAT, and return path.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Routing Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-006",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Default route?",
                "options": [
                  "A value used by routing protocols to prefer one path over another.",
                  "A manually configured route to a destination network or default path.",
                  "A Layer 3 device that forwards packets between IP networks.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 3,
                "explanation": "Default route matters in objective 2.1 because Fallback route used when no more specific route matches. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-007",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A host can reach local devices but cannot reach any remote subnet after its gateway was changed. Which routing item should be verified first?",
                "options": [
                  "The mail exchanger record.",
                  "The rack humidity sensor.",
                  "The host default gateway and the router path for remote networks.",
                  "The wireless channel width."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 2.1, Routing Technologies. The host default gateway and the router path for remote networks. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-008",
                "objective": "2.1",
                "domain": 2,
                "prompt": "Before changing production settings for Routing Technologies, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should trace host gateway, route table, next hop, NAT, and return path.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 2.1: trace host gateway, route table, next hop, NAT, and return path. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-009",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A help desk note says: \"A host can reach local devices but cannot reach any remote subnet after its gateway was changed.\" What is the best interpretation?",
                "options": [
                  "The host default gateway and the router path for remote networks.",
                  "The wireless channel width.",
                  "The mail exchanger record.",
                  "The rack humidity sensor."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Routing Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n21-routing-technologies-010",
                "objective": "2.1",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.1, Routing Technologies?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician trace host gateway, route table, next hop, NAT, and return path."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Routing Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n22-switching-technologies-section",
        "title": "Section 2.2 - Switching Technologies",
        "summary": "Configure VLANs, trunks, SVIs, STP, aggregation, speed, duplex, and port protections.",
        "activities": [
          {
            "id": "n22-switching-technologies-lesson",
            "type": "lesson",
            "title": "Switching Technologies",
            "duration": 18,
            "required": true,
            "domain": 2,
            "objective": "2.2",
            "difficulty": "developing",
            "summary": "Switching is local network delivery at Layer 2. A switch learns source MAC addresses on its ports and builds a MAC address table. When it knows the destination MAC address, it forwards the frame only out the correct port. When it does not know the destination, it floods the frame within the same VLAN.",
            "learningObjectives": [
              "Explain how switches forward frames inside a LAN",
              "Compare VLANs, trunks, STP, SVIs, and link aggregation",
              "Recognize switching symptoms from MAC, VLAN, and loop evidence"
            ],
            "headings": [
              "What switching does",
              "VLANs and trunks",
              "Inter-VLAN routing",
              "Loops, STP, and aggregation",
              "Implementation evidence",
              "Mastery target"
            ],
            "content": [
              "Switching is local network delivery at Layer 2. A switch learns source MAC addresses on its ports and builds a MAC address table. When it knows the destination MAC address, it forwards the frame only out the correct port. When it does not know the destination, it floods the frame within the same VLAN.",
              "A VLAN is a logical Layer 2 broadcast domain. VLANs let one physical switching infrastructure carry separate networks such as users, voice, servers, and management. An access port belongs to one VLAN for an endpoint. An 802.1Q trunk carries tagged traffic for multiple VLANs between switches, routers, firewalls, or hypervisors.",
              "Hosts in different VLANs usually need Layer 3 routing to communicate. That routing might happen on a router-on-a-stick subinterface, a firewall interface, or a multilayer switch SVI. An SVI is a virtual Layer 3 interface for a VLAN and often becomes the default gateway for hosts in that VLAN.",
              "Layer 2 loops are dangerous because Ethernet frames do not have a TTL. Spanning Tree Protocol blocks redundant paths until needed so loops do not multiply broadcasts. Link aggregation combines multiple physical links into one logical link for capacity and resilience, but both sides must agree on the bundle settings.",
              "Switching evidence includes link status, port VLAN assignment, trunk allowed VLAN list, MAC address table, ARP table, STP state, interface counters, and errors. If one VLAN works and another does not, check tagging, allowed VLANs, gateway/SVI state, and DHCP scope for that VLAN.",
              "Mastery means you can tell the difference between a VLAN problem, a trunk problem, a routing problem, a switching loop, and a physical interface problem from the clues in the scenario."
            ]
          },
          {
            "id": "n22-switching-technologies-scenario",
            "type": "scenario",
            "title": "Worked scenario - Switching Technologies",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.2",
            "difficulty": "developing",
            "summary": "Apply switching technologies to a realistic Network+ decision.",
            "evidence": [
              "Only users on VLAN 30 fail after a trunk change between two switches.",
              "The objective evidence should let the technician check port mode, VLAN assignment, trunk allowed list, SVI, and STP state.",
              "The decision should preserve service while narrowing switching technologies to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician check port mode, VLAN assignment, trunk allowed list, SVI, and STP state.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Switching Technologies scenario is testing objective 2.2. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n22-switching-technologies-cards",
            "type": "flashcards",
            "title": "Switching Technologies flashcards",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.2",
            "difficulty": "developing",
            "summary": "Practice the terms needed for objective 2.2.",
            "cards": [
              [
                "Switch",
                "Forwards Ethernet frames inside a LAN using MAC addresses."
              ],
              [
                "MAC address table",
                "Switch table mapping learned MAC addresses to ports."
              ],
              [
                "VLAN",
                "A logical Layer 2 broadcast domain."
              ],
              [
                "Access port",
                "A switch port assigned to one VLAN for an endpoint."
              ],
              [
                "802.1Q trunk",
                "A link that carries tagged frames for multiple VLANs."
              ],
              [
                "Native VLAN",
                "VLAN carried untagged on an 802.1Q trunk."
              ],
              [
                "SVI",
                "A virtual Layer 3 interface for a VLAN."
              ],
              [
                "Inter-VLAN routing",
                "Routing traffic between separate VLANs."
              ],
              [
                "STP",
                "Spanning Tree Protocol prevents Layer 2 loops."
              ],
              [
                "Link aggregation",
                "Combines multiple physical links into one logical link."
              ],
              [
                "Broadcast domain",
                "A Layer 2 area reached by broadcast frames."
              ],
              [
                "Port security",
                "Switch feature limiting which MAC addresses can use a port."
              ]
            ]
          },
          {
            "id": "n22-switching-technologies-check",
            "type": "quiz",
            "title": "Switching Technologies coached check",
            "duration": 8,
            "required": true,
            "domain": 2,
            "objective": "2.2",
            "difficulty": "developing",
            "summary": "Five coached questions for objective 2.2.",
            "questions": [
              {
                "id": "check-n22-switching-technologies-001",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n22-switching-technologies-002",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Only users on VLAN 30 fail after a trunk change between two switches. Which switching item is most likely relevant?",
                "options": [
                  "Whether DNS has an MX record.",
                  "Whether the WAN has a cold site.",
                  "Whether the DHCP server supports WPA3.",
                  "Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.2, Switching Technologies. Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n22-switching-technologies-003",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Before changing production settings for Switching Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check port mode, VLAN assignment, trunk allowed list, SVI, and STP state.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.2: check port mode, VLAN assignment, trunk allowed list, SVI, and STP state. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n22-switching-technologies-004",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A help desk note says: \"Only users on VLAN 30 fail after a trunk change between two switches.\" What is the best interpretation?",
                "options": [
                  "Whether the DHCP server supports WPA3.",
                  "Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk.",
                  "Whether DNS has an MX record.",
                  "Whether the WAN has a cold site."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Switching Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n22-switching-technologies-005",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.2, Switching Technologies?",
                "options": [
                  "Evidence that lets the technician check port mode, VLAN assignment, trunk allowed list, SVI, and STP state.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Switching Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n22-switching-technologies-quiz",
            "type": "quiz",
            "title": "Switching Technologies section quiz",
            "duration": 12,
            "required": true,
            "domain": 2,
            "objective": "2.2",
            "difficulty": "developing",
            "summary": "Ten section quiz questions for objective 2.2.",
            "questions": [
              {
                "id": "quiz-n22-switching-technologies-001",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches Port security?",
                "options": [
                  "Switch feature limiting which MAC addresses can use a port.",
                  "Combines multiple physical links into one logical link.",
                  "Routing traffic between separate VLANs.",
                  "VLAN carried untagged on an 802.1Q trunk."
                ],
                "correctIndex": 0,
                "explanation": "Port security matters in objective 2.2 because Switch feature limiting which MAC addresses can use a port. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-002",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Only users on VLAN 30 fail after a trunk change between two switches. Which switching item is most likely relevant?",
                "options": [
                  "Whether DNS has an MX record.",
                  "Whether the WAN has a cold site.",
                  "Whether the DHCP server supports WPA3.",
                  "Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.2, Switching Technologies. Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-003",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Before changing production settings for Switching Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check port mode, VLAN assignment, trunk allowed list, SVI, and STP state.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.2: check port mode, VLAN assignment, trunk allowed list, SVI, and STP state. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-004",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A help desk note says: \"Only users on VLAN 30 fail after a trunk change between two switches.\" What is the best interpretation?",
                "options": [
                  "Whether the DHCP server supports WPA3.",
                  "Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk.",
                  "Whether DNS has an MX record.",
                  "Whether the WAN has a cold site."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Switching Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-005",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.2, Switching Technologies?",
                "options": [
                  "Evidence that lets the technician check port mode, VLAN assignment, trunk allowed list, SVI, and STP state.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Switching Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-006",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches SVI?",
                "options": [
                  "A link that carries tagged frames for multiple VLANs.",
                  "A logical Layer 2 broadcast domain.",
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 3,
                "explanation": "SVI matters in objective 2.2 because A virtual Layer 3 interface for a VLAN. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-007",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Only users on VLAN 30 fail after a trunk change between two switches. Which switching item is most likely relevant?",
                "options": [
                  "Whether the WAN has a cold site.",
                  "Whether the DHCP server supports WPA3.",
                  "Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk.",
                  "Whether DNS has an MX record."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 2.2, Switching Technologies. Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-008",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Before changing production settings for Switching Technologies, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check port mode, VLAN assignment, trunk allowed list, SVI, and STP state.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 2.2: check port mode, VLAN assignment, trunk allowed list, SVI, and STP state. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-009",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A help desk note says: \"Only users on VLAN 30 fail after a trunk change between two switches.\" What is the best interpretation?",
                "options": [
                  "Whether VLAN 30 is allowed and tagged correctly across the 802.1Q trunk.",
                  "Whether DNS has an MX record.",
                  "Whether the WAN has a cold site.",
                  "Whether the DHCP server supports WPA3."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Switching Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n22-switching-technologies-010",
                "objective": "2.2",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.2, Switching Technologies?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician check port mode, VLAN assignment, trunk allowed list, SVI, and STP state."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Switching Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n23-wireless-technologies-section",
        "title": "Section 2.3 - Wireless Technologies",
        "summary": "Configure wireless authentication, channels, channel width, SSIDs, roaming, and AP/controller behavior.",
        "activities": [
          {
            "id": "n23-wireless-technologies-lesson",
            "type": "lesson",
            "title": "Wireless Technologies",
            "duration": 18,
            "required": true,
            "domain": 2,
            "objective": "2.3",
            "difficulty": "developing",
            "summary": "Wireless LANs extend Layer 2 access over radio instead of copper. A client joins a network by discovering an SSID, authenticating, associating to an access point, and then using normal IP services such as DHCP and DNS. The convenience of wireless comes with shared airtime, interference, and security design choices.",
            "learningObjectives": [
              "Explain wireless LAN basics from SSID to association",
              "Compare bands, channels, channel width, roaming, and authentication",
              "Choose wireless design and troubleshooting evidence"
            ],
            "headings": [
              "What wireless provides",
              "Bands, channels, and coverage",
              "Authentication and encryption",
              "Roaming and design",
              "Troubleshooting evidence",
              "Mastery target"
            ],
            "content": [
              "Wireless LANs extend Layer 2 access over radio instead of copper. A client joins a network by discovering an SSID, authenticating, associating to an access point, and then using normal IP services such as DHCP and DNS. The convenience of wireless comes with shared airtime, interference, and security design choices.",
              "The 2.4 GHz band reaches farther and penetrates obstacles better, but it has fewer non-overlapping channels and is often crowded. The 5 GHz and 6 GHz bands offer more channels and more capacity, but shorter range. Channel width affects throughput and interference: wider channels can be faster but consume more spectrum and overlap more easily.",
              "Personal wireless commonly uses a pre-shared key. Enterprise wireless uses 802.1X with a RADIUS server so each user or device can authenticate individually. Encryption protects wireless frames from casual capture, but weak passphrases, outdated modes, or open guest networks still create risk.",
              "Good wireless design considers access point placement, antenna pattern, transmit power, channel plan, client density, roaming needs, and interference sources. Roaming works best when coverage cells overlap enough for handoff but not so much that clients cling to distant APs.",
              "Wireless troubleshooting evidence includes RSSI, SNR, channel utilization, retry rate, client count, band steering behavior, DHCP success, authentication logs, and a site survey. If a client shows strong signal but cannot get an address, the issue may be DHCP or VLAN mapping rather than RF.",
              "Mastery means you can read a wireless symptom and decide whether it points to coverage, capacity, interference, authentication, VLAN mapping, DHCP, or client compatibility."
            ]
          },
          {
            "id": "n23-wireless-technologies-scenario",
            "type": "scenario",
            "title": "Worked scenario - Wireless Technologies",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.3",
            "difficulty": "developing",
            "summary": "Apply wireless technologies to a realistic Network+ decision.",
            "evidence": [
              "Clients near an AP show strong signal but high retries and unstable voice calls.",
              "The objective evidence should let the technician measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior.",
              "The decision should preserve service while narrowing wireless technologies to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Channel utilization, interference, SNR, retries, and channel plan.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Wireless Technologies scenario is testing objective 2.3. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n23-wireless-technologies-cards",
            "type": "flashcards",
            "title": "Wireless Technologies flashcards",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.3",
            "difficulty": "developing",
            "summary": "Practice the terms needed for objective 2.3.",
            "cards": [
              [
                "SSID",
                "The wireless network name advertised or configured for clients."
              ],
              [
                "BSSID",
                "The radio MAC address of a specific access point."
              ],
              [
                "2.4 GHz",
                "Longer range band with fewer non-overlapping channels."
              ],
              [
                "5 GHz",
                "Higher capacity band with more channels and shorter range."
              ],
              [
                "6 GHz",
                "Newer Wi-Fi band with additional clean spectrum."
              ],
              [
                "Channel width",
                "Amount of spectrum used by a wireless channel."
              ],
              [
                "RSSI",
                "Received signal strength indicator."
              ],
              [
                "SNR",
                "Signal-to-noise ratio, comparing signal strength to noise."
              ],
              [
                "WPA3",
                "Modern Wi-Fi security standard."
              ],
              [
                "802.1X",
                "Port-based authentication often used with enterprise Wi-Fi."
              ],
              [
                "RADIUS",
                "Central authentication service used by enterprise wireless."
              ],
              [
                "Roaming",
                "Client movement between APs while staying connected."
              ]
            ]
          },
          {
            "id": "n23-wireless-technologies-check",
            "type": "quiz",
            "title": "Wireless Technologies coached check",
            "duration": 8,
            "required": true,
            "domain": 2,
            "objective": "2.3",
            "difficulty": "developing",
            "summary": "Five coached questions for objective 2.3.",
            "questions": [
              {
                "id": "check-n23-wireless-technologies-001",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n23-wireless-technologies-002",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Clients near an AP show strong signal but high retries and unstable voice calls. Which wireless evidence matters most?",
                "options": [
                  "The public IPv4 NAT pool.",
                  "The server RAID level.",
                  "The MDF rack unit count only.",
                  "Channel utilization, interference, SNR, retries, and channel plan."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.3, Wireless Technologies. Channel utilization, interference, SNR, retries, and channel plan. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n23-wireless-technologies-003",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Before changing production settings for Wireless Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.3: measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n23-wireless-technologies-004",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A help desk note says: \"Clients near an AP show strong signal but high retries and unstable voice calls.\" What is the best interpretation?",
                "options": [
                  "The MDF rack unit count only.",
                  "Channel utilization, interference, SNR, retries, and channel plan.",
                  "The public IPv4 NAT pool.",
                  "The server RAID level."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Wireless Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n23-wireless-technologies-005",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.3, Wireless Technologies?",
                "options": [
                  "Evidence that lets the technician measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Wireless Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n23-wireless-technologies-quiz",
            "type": "quiz",
            "title": "Wireless Technologies section quiz",
            "duration": 12,
            "required": true,
            "domain": 2,
            "objective": "2.3",
            "difficulty": "developing",
            "summary": "Ten section quiz questions for objective 2.3.",
            "questions": [
              {
                "id": "quiz-n23-wireless-technologies-001",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches Roaming?",
                "options": [
                  "Client movement between APs while staying connected.",
                  "Port-based authentication often used with enterprise Wi-Fi.",
                  "Signal-to-noise ratio, comparing signal strength to noise.",
                  "Amount of spectrum used by a wireless channel."
                ],
                "correctIndex": 0,
                "explanation": "Roaming matters in objective 2.3 because Client movement between APs while staying connected. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-002",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Clients near an AP show strong signal but high retries and unstable voice calls. Which wireless evidence matters most?",
                "options": [
                  "The public IPv4 NAT pool.",
                  "The server RAID level.",
                  "The MDF rack unit count only.",
                  "Channel utilization, interference, SNR, retries, and channel plan."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.3, Wireless Technologies. Channel utilization, interference, SNR, retries, and channel plan. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-003",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Before changing production settings for Wireless Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.3: measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-004",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A help desk note says: \"Clients near an AP show strong signal but high retries and unstable voice calls.\" What is the best interpretation?",
                "options": [
                  "The MDF rack unit count only.",
                  "Channel utilization, interference, SNR, retries, and channel plan.",
                  "The public IPv4 NAT pool.",
                  "The server RAID level."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Wireless Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-005",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.3, Wireless Technologies?",
                "options": [
                  "Evidence that lets the technician measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Wireless Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-006",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches RSSI?",
                "options": [
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Longer range band with fewer non-overlapping channels.",
                  "The wireless network name advertised or configured for clients.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 3,
                "explanation": "RSSI matters in objective 2.3 because Received signal strength indicator. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-007",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Clients near an AP show strong signal but high retries and unstable voice calls. Which wireless evidence matters most?",
                "options": [
                  "The server RAID level.",
                  "The MDF rack unit count only.",
                  "Channel utilization, interference, SNR, retries, and channel plan.",
                  "The public IPv4 NAT pool."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 2.3, Wireless Technologies. Channel utilization, interference, SNR, retries, and channel plan. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-008",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Before changing production settings for Wireless Technologies, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 2.3: measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-009",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A help desk note says: \"Clients near an AP show strong signal but high retries and unstable voice calls.\" What is the best interpretation?",
                "options": [
                  "Channel utilization, interference, SNR, retries, and channel plan.",
                  "The public IPv4 NAT pool.",
                  "The server RAID level.",
                  "The MDF rack unit count only."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Wireless Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n23-wireless-technologies-010",
                "objective": "2.3",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.3, Wireless Technologies?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician measure RF quality, authentication, roaming, VLAN mapping, and DHCP behavior."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Wireless Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n24-physical-installation-factors-section",
        "title": "Section 2.4 - Physical Installation Factors",
        "summary": "Plan MDF/IDF, cabling, racks, power, grounding, HVAC, and labeling.",
        "activities": [
          {
            "id": "n24-physical-installation-factors-lesson",
            "type": "lesson",
            "title": "Physical Installation Factors",
            "duration": 18,
            "required": true,
            "domain": 2,
            "objective": "2.4",
            "difficulty": "developing",
            "summary": "Physical installation is the foundation every higher layer depends on. A perfect VLAN or routing design still fails if the cable is damaged, the rack has no power, the fiber is the wrong type, or the closet overheats. Network+ expects you to connect logical symptoms to physical realities.",
            "learningObjectives": [
              "Identify closets, racks, cabling paths, and power needs",
              "Explain installation concerns that affect reliability and safety",
              "Use physical evidence before replacing logical configurations"
            ],
            "headings": [
              "Why physical installation matters",
              "MDF, IDF, and rack layout",
              "Patch panels and cable management",
              "Power, grounding, and environment",
              "Installation evidence",
              "Mastery target"
            ],
            "content": [
              "Physical installation is the foundation every higher layer depends on. A perfect VLAN or routing design still fails if the cable is damaged, the rack has no power, the fiber is the wrong type, or the closet overheats. Network+ expects you to connect logical symptoms to physical realities.",
              "The MDF is the main distribution frame where core network, service provider handoff, or primary building aggregation often lives. IDFs are intermediate closets closer to users or floors. Racks, rails, cable trays, labels, and patch panels turn a messy physical plant into something maintainable.",
              "Patch panels terminate horizontal cabling and let technicians connect ports to switches with short patch cables. Good cable management preserves bend radius, airflow, and traceability. Labeling matters because a wrong patch can look like a software problem from the help desk.",
              "Power design includes UPS capacity, PDUs, redundant power supplies, PoE budgets, grounding, bonding, and generator or battery planning. Environmental factors include temperature, humidity, dust, water exposure, EMI, and physical security of closets and racks.",
              "Installation evidence includes link lights, cable certification results, PoE draw, switch counters, rack temperature, UPS status, labels, patch records, and photos. When many endpoints in one closet fail together, investigate the closet before treating it like 40 unrelated workstation tickets.",
              "Mastery means you can walk into a network room, identify the role of each physical component, spot risk, and connect physical evidence to Layer 1 and Layer 2 symptoms."
            ]
          },
          {
            "id": "n24-physical-installation-factors-scenario",
            "type": "scenario",
            "title": "Worked scenario - Physical Installation Factors",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.4",
            "difficulty": "developing",
            "summary": "Apply physical installation factors to a realistic Network+ decision.",
            "evidence": [
              "All endpoints patched through one closet lost connectivity after a power event.",
              "The objective evidence should let the technician inspect closet, rack, cabling, power, grounding, labels, and switch counters.",
              "The decision should preserve service while narrowing physical installation factors to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "The IDF power, UPS/PDU status, switch status, patching, and environmental conditions.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician inspect closet, rack, cabling, power, grounding, labels, and switch counters.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Physical Installation Factors scenario is testing objective 2.4. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n24-physical-installation-factors-cards",
            "type": "flashcards",
            "title": "Physical Installation Factors flashcards",
            "duration": 10,
            "required": true,
            "domain": 2,
            "objective": "2.4",
            "difficulty": "developing",
            "summary": "Practice the terms needed for objective 2.4.",
            "cards": [
              [
                "MDF",
                "Main distribution frame, often the primary network room."
              ],
              [
                "IDF",
                "Intermediate distribution frame closer to endpoints or floors."
              ],
              [
                "Patch panel",
                "Termination point that maps cabling to switch patch cords."
              ],
              [
                "Rack unit",
                "Standard vertical rack measurement, abbreviated U."
              ],
              [
                "Cable management",
                "Organizing cables to protect airflow, bend radius, and traceability."
              ],
              [
                "Bend radius",
                "Minimum safe curve for cable, especially fiber."
              ],
              [
                "UPS",
                "Battery backup that keeps equipment online during power loss."
              ],
              [
                "PDU",
                "Power distribution unit for rack equipment."
              ],
              [
                "PoE budget",
                "Total power a switch can deliver to powered devices."
              ],
              [
                "Grounding",
                "Electrical safety path that reduces shock and equipment risk."
              ],
              [
                "EMI",
                "Electromagnetic interference affecting copper cabling."
              ],
              [
                "Labeling",
                "Physical documentation that makes ports and paths traceable."
              ]
            ]
          },
          {
            "id": "n24-physical-installation-factors-check",
            "type": "quiz",
            "title": "Physical Installation Factors coached check",
            "duration": 8,
            "required": true,
            "domain": 2,
            "objective": "2.4",
            "difficulty": "developing",
            "summary": "Five coached questions for objective 2.4.",
            "questions": [
              {
                "id": "check-n24-physical-installation-factors-001",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n24-physical-installation-factors-002",
                "objective": "2.4",
                "domain": 2,
                "prompt": "All endpoints patched through one closet lost connectivity after a power event. Where should investigation start?",
                "options": [
                  "The SaaS provider identity plan.",
                  "The DNS TXT records for email.",
                  "The internet BGP table first.",
                  "The IDF power, UPS/PDU status, switch status, patching, and environmental conditions."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.4, Physical Installation Factors. The IDF power, UPS/PDU status, switch status, patching, and environmental conditions. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n24-physical-installation-factors-003",
                "objective": "2.4",
                "domain": 2,
                "prompt": "Before changing production settings for Physical Installation Factors, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should inspect closet, rack, cabling, power, grounding, labels, and switch counters.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.4: inspect closet, rack, cabling, power, grounding, labels, and switch counters. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n24-physical-installation-factors-004",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A help desk note says: \"All endpoints patched through one closet lost connectivity after a power event.\" What is the best interpretation?",
                "options": [
                  "The internet BGP table first.",
                  "The IDF power, UPS/PDU status, switch status, patching, and environmental conditions.",
                  "The SaaS provider identity plan.",
                  "The DNS TXT records for email."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Physical Installation Factors, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n24-physical-installation-factors-005",
                "objective": "2.4",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.4, Physical Installation Factors?",
                "options": [
                  "Evidence that lets the technician inspect closet, rack, cabling, power, grounding, labels, and switch counters.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Physical Installation Factors, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n24-physical-installation-factors-quiz",
            "type": "quiz",
            "title": "Physical Installation Factors section quiz",
            "duration": 12,
            "required": true,
            "domain": 2,
            "objective": "2.4",
            "difficulty": "developing",
            "summary": "Ten section quiz questions for objective 2.4.",
            "questions": [
              {
                "id": "quiz-n24-physical-installation-factors-001",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches Labeling?",
                "options": [
                  "Physical documentation that makes ports and paths traceable.",
                  "Electrical safety path that reduces shock and equipment risk.",
                  "Power distribution unit for rack equipment.",
                  "Minimum safe curve for cable, especially fiber."
                ],
                "correctIndex": 0,
                "explanation": "Labeling matters in objective 2.4 because Physical documentation that makes ports and paths traceable. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-002",
                "objective": "2.4",
                "domain": 2,
                "prompt": "All endpoints patched through one closet lost connectivity after a power event. Where should investigation start?",
                "options": [
                  "The SaaS provider identity plan.",
                  "The DNS TXT records for email.",
                  "The internet BGP table first.",
                  "The IDF power, UPS/PDU status, switch status, patching, and environmental conditions."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 2.4, Physical Installation Factors. The IDF power, UPS/PDU status, switch status, patching, and environmental conditions. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-003",
                "objective": "2.4",
                "domain": 2,
                "prompt": "Before changing production settings for Physical Installation Factors, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should inspect closet, rack, cabling, power, grounding, labels, and switch counters.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 2.4: inspect closet, rack, cabling, power, grounding, labels, and switch counters. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-004",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A help desk note says: \"All endpoints patched through one closet lost connectivity after a power event.\" What is the best interpretation?",
                "options": [
                  "The internet BGP table first.",
                  "The IDF power, UPS/PDU status, switch status, patching, and environmental conditions.",
                  "The SaaS provider identity plan.",
                  "The DNS TXT records for email."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Physical Installation Factors, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-005",
                "objective": "2.4",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.4, Physical Installation Factors?",
                "options": [
                  "Evidence that lets the technician inspect closet, rack, cabling, power, grounding, labels, and switch counters.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Physical Installation Factors, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-006",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches UPS?",
                "options": [
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Main distribution frame, often the primary network room.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 3,
                "explanation": "UPS matters in objective 2.4 because Battery backup that keeps equipment online during power loss. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-007",
                "objective": "2.4",
                "domain": 2,
                "prompt": "All endpoints patched through one closet lost connectivity after a power event. Where should investigation start?",
                "options": [
                  "The DNS TXT records for email.",
                  "The internet BGP table first.",
                  "The IDF power, UPS/PDU status, switch status, patching, and environmental conditions.",
                  "The SaaS provider identity plan."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 2.4, Physical Installation Factors. The IDF power, UPS/PDU status, switch status, patching, and environmental conditions. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-008",
                "objective": "2.4",
                "domain": 2,
                "prompt": "Before changing production settings for Physical Installation Factors, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should inspect closet, rack, cabling, power, grounding, labels, and switch counters.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 2.4: inspect closet, rack, cabling, power, grounding, labels, and switch counters. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-009",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A help desk note says: \"All endpoints patched through one closet lost connectivity after a power event.\" What is the best interpretation?",
                "options": [
                  "The IDF power, UPS/PDU status, switch status, patching, and environmental conditions.",
                  "The SaaS provider identity plan.",
                  "The DNS TXT records for email.",
                  "The internet BGP table first."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Physical Installation Factors, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n24-physical-installation-factors-010",
                "objective": "2.4",
                "domain": 2,
                "prompt": "Which evidence would most improve confidence when working through objective 2.4, Physical Installation Factors?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician inspect closet, rack, cabling, power, grounding, labels, and switch counters."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Physical Installation Factors, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "t2-final-section",
        "title": "Tier 2 final checkpoint",
        "summary": "Mixed review for Network Implementation.",
        "activities": [
          {
            "id": "t2-checkpoint",
            "type": "checkpoint",
            "title": "Tier 2 cumulative checkpoint",
            "duration": 25,
            "required": true,
            "domain": 2,
            "objective": "Tier 2 synthesis",
            "difficulty": "developing",
            "summary": "Twenty mixed questions covering Network Implementation.",
            "questions": [
              {
                "id": "checkpoint-tier-2-001-001",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-002-001",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-003-001",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-004-001",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-005-001",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-006-001",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-007-001",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-008-001",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-009-001",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-010-001",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-011-001",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-012-001",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-013-001",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-014-001",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-015-001",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-016-001",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-017-001",
                "objective": "2.1",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-018-001",
                "objective": "2.2",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-019-001",
                "objective": "2.3",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-2-020-001",
                "objective": "2.4",
                "domain": 2,
                "prompt": "A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tier-3",
    "number": 3,
    "title": "Network Operations",
    "subtitle": "Go from zero to fluent in network operations.",
    "difficulty": "applied",
    "color": "#8aa7ff",
    "minutes": 285,
    "recommendedAfter": 2,
    "modules": [
      {
        "id": "n31-organizational-processes-and-procedures-section",
        "title": "Section 3.1 - Organizational Processes and Procedures",
        "summary": "Use documentation, change management, asset inventory, and lifecycle management.",
        "activities": [
          {
            "id": "n31-organizational-processes-and-procedures-lesson",
            "type": "lesson",
            "title": "Organizational Processes and Procedures",
            "duration": 18,
            "required": true,
            "domain": 3,
            "objective": "3.1",
            "difficulty": "applied",
            "summary": "Network operations is the discipline that keeps a network understandable after it is built. Without diagrams, inventories, standards, and change records, every outage becomes archaeology. Network+ treats documentation as an operational control, not paperwork for its own sake.",
            "learningObjectives": [
              "Explain operational documents and why they matter",
              "Connect change management, asset tracking, and lifecycle planning to uptime",
              "Use documentation as troubleshooting evidence"
            ],
            "headings": [
              "Operations is how networks stay understandable",
              "Diagrams and inventories",
              "Change and configuration management",
              "Lifecycle, policy, and procedure",
              "Operational evidence",
              "Mastery target"
            ],
            "content": [
              "Network operations is the discipline that keeps a network understandable after it is built. Without diagrams, inventories, standards, and change records, every outage becomes archaeology. Network+ treats documentation as an operational control, not paperwork for its own sake.",
              "Physical diagrams show cables, rooms, racks, patch panels, and devices. Logical diagrams show subnets, VLANs, routing, zones, and traffic relationships. Asset inventories track hostnames, serial numbers, owners, locations, software versions, warranties, and support status.",
              "Change management reduces risk by asking what will change, why, when, who approves it, how it will be tested, and how it will be rolled back. Configuration management records desired device state so technicians can compare what should be true against what is actually configured.",
              "Lifecycle planning watches end-of-life, end-of-support, licensing, capacity, maintenance windows, onboarding, offboarding, and compliance requirements. Procedures such as incident response and escalation paths help teams make good decisions under pressure.",
              "Operational evidence includes a recent change ticket, a stale diagram, a missing asset owner, an expired certificate, a device past support, or a configuration drift report. If a problem started after a change window, the change record is evidence, not blame.",
              "Mastery means you can explain how documentation, process, and lifecycle management prevent outages and speed up recovery when outages still happen."
            ]
          },
          {
            "id": "n31-organizational-processes-and-procedures-scenario",
            "type": "scenario",
            "title": "Worked scenario - Organizational Processes and Procedures",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.1",
            "difficulty": "applied",
            "summary": "Apply organizational processes and procedures to a realistic Network+ decision.",
            "evidence": [
              "An outage began immediately after a maintenance window, but no one knows what changed.",
              "The objective evidence should let the technician use diagrams, inventories, change records, runbooks, and lifecycle data.",
              "The decision should preserve service while narrowing organizational processes and procedures to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "A change record with implementation steps, approval, testing, and rollback details.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician use diagrams, inventories, change records, runbooks, and lifecycle data.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Organizational Processes and Procedures scenario is testing objective 3.1. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n31-organizational-processes-and-procedures-cards",
            "type": "flashcards",
            "title": "Organizational Processes and Procedures flashcards",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.1",
            "difficulty": "applied",
            "summary": "Practice the terms needed for objective 3.1.",
            "cards": [
              [
                "Physical diagram",
                "Shows real-world device, cable, rack, and room relationships."
              ],
              [
                "Logical diagram",
                "Shows subnets, VLANs, routes, zones, and traffic flows."
              ],
              [
                "Asset inventory",
                "Tracked list of devices, owners, versions, locations, and support data."
              ],
              [
                "Change management",
                "Controlled process for approving, testing, implementing, and rolling back changes."
              ],
              [
                "Rollback plan",
                "Steps to return to the previous working state."
              ],
              [
                "Configuration management",
                "Tracking and controlling desired device settings."
              ],
              [
                "EOL",
                "End of life; vendor no longer sells or develops a product."
              ],
              [
                "EOS",
                "End of support; vendor support or fixes are no longer available."
              ],
              [
                "Maintenance window",
                "Approved time period for disruptive work."
              ],
              [
                "Runbook",
                "Step-by-step operational procedure."
              ],
              [
                "Escalation path",
                "Defined route for involving higher-level support."
              ],
              [
                "SLA",
                "Service level agreement describing service expectations."
              ]
            ]
          },
          {
            "id": "n31-organizational-processes-and-procedures-check",
            "type": "quiz",
            "title": "Organizational Processes and Procedures coached check",
            "duration": 8,
            "required": true,
            "domain": 3,
            "objective": "3.1",
            "difficulty": "applied",
            "summary": "Five coached questions for objective 3.1.",
            "questions": [
              {
                "id": "check-n31-organizational-processes-and-procedures-001",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n31-organizational-processes-and-procedures-002",
                "objective": "3.1",
                "domain": 3,
                "prompt": "An outage began immediately after a maintenance window, but no one knows what changed. Which operational artifact would help most?",
                "options": [
                  "A stronger wireless antenna pattern.",
                  "A larger DHCP exclusion range only.",
                  "An unrelated packet size setting.",
                  "A change record with implementation steps, approval, testing, and rollback details."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.1, Organizational Processes and Procedures. A change record with implementation steps, approval, testing, and rollback details. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n31-organizational-processes-and-procedures-003",
                "objective": "3.1",
                "domain": 3,
                "prompt": "Before changing production settings for Organizational Processes and Procedures, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should use diagrams, inventories, change records, runbooks, and lifecycle data.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.1: use diagrams, inventories, change records, runbooks, and lifecycle data. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n31-organizational-processes-and-procedures-004",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A help desk note says: \"An outage began immediately after a maintenance window, but no one knows what changed.\" What is the best interpretation?",
                "options": [
                  "An unrelated packet size setting.",
                  "A change record with implementation steps, approval, testing, and rollback details.",
                  "A stronger wireless antenna pattern.",
                  "A larger DHCP exclusion range only."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Organizational Processes and Procedures, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n31-organizational-processes-and-procedures-005",
                "objective": "3.1",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.1, Organizational Processes and Procedures?",
                "options": [
                  "Evidence that lets the technician use diagrams, inventories, change records, runbooks, and lifecycle data.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Organizational Processes and Procedures, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n31-organizational-processes-and-procedures-quiz",
            "type": "quiz",
            "title": "Organizational Processes and Procedures section quiz",
            "duration": 12,
            "required": true,
            "domain": 3,
            "objective": "3.1",
            "difficulty": "applied",
            "summary": "Ten section quiz questions for objective 3.1.",
            "questions": [
              {
                "id": "quiz-n31-organizational-processes-and-procedures-001",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches SLA?",
                "options": [
                  "Service level agreement describing service expectations.",
                  "Step-by-step operational procedure.",
                  "End of support; vendor support or fixes are no longer available.",
                  "Tracking and controlling desired device settings."
                ],
                "correctIndex": 0,
                "explanation": "SLA matters in objective 3.1 because Service level agreement describing service expectations. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-002",
                "objective": "3.1",
                "domain": 3,
                "prompt": "An outage began immediately after a maintenance window, but no one knows what changed. Which operational artifact would help most?",
                "options": [
                  "A stronger wireless antenna pattern.",
                  "A larger DHCP exclusion range only.",
                  "An unrelated packet size setting.",
                  "A change record with implementation steps, approval, testing, and rollback details."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.1, Organizational Processes and Procedures. A change record with implementation steps, approval, testing, and rollback details. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-003",
                "objective": "3.1",
                "domain": 3,
                "prompt": "Before changing production settings for Organizational Processes and Procedures, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should use diagrams, inventories, change records, runbooks, and lifecycle data.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.1: use diagrams, inventories, change records, runbooks, and lifecycle data. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-004",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A help desk note says: \"An outage began immediately after a maintenance window, but no one knows what changed.\" What is the best interpretation?",
                "options": [
                  "An unrelated packet size setting.",
                  "A change record with implementation steps, approval, testing, and rollback details.",
                  "A stronger wireless antenna pattern.",
                  "A larger DHCP exclusion range only."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Organizational Processes and Procedures, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-005",
                "objective": "3.1",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.1, Organizational Processes and Procedures?",
                "options": [
                  "Evidence that lets the technician use diagrams, inventories, change records, runbooks, and lifecycle data.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Organizational Processes and Procedures, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-006",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches EOL?",
                "options": [
                  "Steps to return to the previous working state.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Shows real-world device, cable, rack, and room relationships.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 3,
                "explanation": "EOL matters in objective 3.1 because End of life; vendor no longer sells or develops a product. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-007",
                "objective": "3.1",
                "domain": 3,
                "prompt": "An outage began immediately after a maintenance window, but no one knows what changed. Which operational artifact would help most?",
                "options": [
                  "A larger DHCP exclusion range only.",
                  "An unrelated packet size setting.",
                  "A change record with implementation steps, approval, testing, and rollback details.",
                  "A stronger wireless antenna pattern."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 3.1, Organizational Processes and Procedures. A change record with implementation steps, approval, testing, and rollback details. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-008",
                "objective": "3.1",
                "domain": 3,
                "prompt": "Before changing production settings for Organizational Processes and Procedures, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should use diagrams, inventories, change records, runbooks, and lifecycle data.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 3.1: use diagrams, inventories, change records, runbooks, and lifecycle data. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-009",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A help desk note says: \"An outage began immediately after a maintenance window, but no one knows what changed.\" What is the best interpretation?",
                "options": [
                  "A change record with implementation steps, approval, testing, and rollback details.",
                  "A stronger wireless antenna pattern.",
                  "A larger DHCP exclusion range only.",
                  "An unrelated packet size setting."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Organizational Processes and Procedures, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n31-organizational-processes-and-procedures-010",
                "objective": "3.1",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.1, Organizational Processes and Procedures?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician use diagrams, inventories, change records, runbooks, and lifecycle data."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Organizational Processes and Procedures, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n32-network-monitoring-technologies-section",
        "title": "Section 3.2 - Network Monitoring Technologies",
        "summary": "Use baselines, SNMP, flow data, packet capture, logs, and alerting.",
        "activities": [
          {
            "id": "n32-network-monitoring-technologies-lesson",
            "type": "lesson",
            "title": "Network Monitoring Technologies",
            "duration": 18,
            "required": true,
            "domain": 3,
            "objective": "3.2",
            "difficulty": "applied",
            "summary": "Monitoring turns a network from a guess into an observed system. It tells teams what is up, what changed, what is saturated, and what is failing. Monitoring does not replace troubleshooting, but it gives troubleshooting a starting point.",
            "learningObjectives": [
              "Explain what network monitoring measures",
              "Compare SNMP, flow data, logs, packet captures, and baselines",
              "Choose the right monitoring evidence for a symptom"
            ],
            "headings": [
              "Why monitoring exists",
              "Baselines and alerting",
              "SNMP, flow, logs, and captures",
              "Metrics that matter",
              "Evidence and blind spots",
              "Mastery target"
            ],
            "content": [
              "Monitoring turns a network from a guess into an observed system. It tells teams what is up, what changed, what is saturated, and what is failing. Monitoring does not replace troubleshooting, but it gives troubleshooting a starting point.",
              "A baseline is a known-normal pattern for bandwidth, latency, errors, CPU, memory, wireless utilization, and application response. Alerts are useful when they compare current behavior to thresholds or baselines that matter. Too many noisy alerts teach teams to ignore the console.",
              "SNMP can poll device counters or receive traps. Flow data such as NetFlow summarizes who is talking to whom, over which ports, and how much. Logs provide event history. Packet capture shows packet-level detail. Each tool answers a different question.",
              "Important metrics include interface utilization, errors, discards, latency, jitter, packet loss, uptime, environmental state, CPU, memory, client count, authentication failures, and service health. A high-utilization link and a high-error link are different problems even if users describe both as slow.",
              "Monitoring has blind spots. If devices are not enrolled, clocks are wrong, retention is short, or thresholds are poorly chosen, the data can mislead. Always ask what the tool can see, what it cannot see, and whether the time range matches the incident.",
              "Mastery means you can pick the monitoring source most likely to confirm or reject a theory: counters for physical errors, flow for bandwidth talkers, logs for events, captures for protocol behavior, and baselines for abnormal trends."
            ]
          },
          {
            "id": "n32-network-monitoring-technologies-scenario",
            "type": "scenario",
            "title": "Worked scenario - Network Monitoring Technologies",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.2",
            "difficulty": "applied",
            "summary": "Apply network monitoring technologies to a realistic Network+ decision.",
            "evidence": [
              "The WAN feels slow every afternoon, but no interface errors are reported.",
              "The objective evidence should let the technician compare baselines, counters, flow records, logs, captures, and alert timing.",
              "The decision should preserve service while narrowing network monitoring technologies to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Baseline utilization and flow data showing whether traffic volume or top talkers changed.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician compare baselines, counters, flow records, logs, captures, and alert timing.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Network Monitoring Technologies scenario is testing objective 3.2. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n32-network-monitoring-technologies-cards",
            "type": "flashcards",
            "title": "Network Monitoring Technologies flashcards",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.2",
            "difficulty": "applied",
            "summary": "Practice the terms needed for objective 3.2.",
            "cards": [
              [
                "Baseline",
                "Known-normal performance or behavior used for comparison."
              ],
              [
                "SNMP poll",
                "Scheduled query for device counters or status."
              ],
              [
                "SNMP trap",
                "Device-generated alert sent to a monitoring system."
              ],
              [
                "NetFlow",
                "Flow summary showing traffic conversations and volume."
              ],
              [
                "Syslog",
                "Centralized event logging from network devices and systems."
              ],
              [
                "Packet capture",
                "Recorded packets for protocol-level analysis."
              ],
              [
                "Interface errors",
                "Counters such as CRC or drops that indicate link trouble."
              ],
              [
                "Latency",
                "Time for traffic to travel from source to destination."
              ],
              [
                "Jitter",
                "Variation in latency, important for voice and video."
              ],
              [
                "Threshold",
                "Configured point where an alert should trigger."
              ],
              [
                "Log aggregation",
                "Collecting logs from many sources in one platform."
              ],
              [
                "Time sync",
                "Accurate clocks needed to correlate events."
              ]
            ]
          },
          {
            "id": "n32-network-monitoring-technologies-check",
            "type": "quiz",
            "title": "Network Monitoring Technologies coached check",
            "duration": 8,
            "required": true,
            "domain": 3,
            "objective": "3.2",
            "difficulty": "applied",
            "summary": "Five coached questions for objective 3.2.",
            "questions": [
              {
                "id": "check-n32-network-monitoring-technologies-001",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n32-network-monitoring-technologies-002",
                "objective": "3.2",
                "domain": 3,
                "prompt": "The WAN feels slow every afternoon, but no interface errors are reported. Which monitoring data helps identify the cause?",
                "options": [
                  "A cable toner test on every wall jack.",
                  "A DNS PTR lookup for the firewall.",
                  "A guest Wi-Fi captive portal screenshot.",
                  "Baseline utilization and flow data showing whether traffic volume or top talkers changed."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.2, Network Monitoring Technologies. Baseline utilization and flow data showing whether traffic volume or top talkers changed. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n32-network-monitoring-technologies-003",
                "objective": "3.2",
                "domain": 3,
                "prompt": "Before changing production settings for Network Monitoring Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare baselines, counters, flow records, logs, captures, and alert timing.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.2: compare baselines, counters, flow records, logs, captures, and alert timing. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n32-network-monitoring-technologies-004",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A help desk note says: \"The WAN feels slow every afternoon, but no interface errors are reported.\" What is the best interpretation?",
                "options": [
                  "A guest Wi-Fi captive portal screenshot.",
                  "Baseline utilization and flow data showing whether traffic volume or top talkers changed.",
                  "A cable toner test on every wall jack.",
                  "A DNS PTR lookup for the firewall."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Monitoring Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n32-network-monitoring-technologies-005",
                "objective": "3.2",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.2, Network Monitoring Technologies?",
                "options": [
                  "Evidence that lets the technician compare baselines, counters, flow records, logs, captures, and alert timing.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Monitoring Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n32-network-monitoring-technologies-quiz",
            "type": "quiz",
            "title": "Network Monitoring Technologies section quiz",
            "duration": 12,
            "required": true,
            "domain": 3,
            "objective": "3.2",
            "difficulty": "applied",
            "summary": "Ten section quiz questions for objective 3.2.",
            "questions": [
              {
                "id": "quiz-n32-network-monitoring-technologies-001",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Time sync?",
                "options": [
                  "Accurate clocks needed to correlate events.",
                  "Configured point where an alert should trigger.",
                  "Time for traffic to travel from source to destination.",
                  "Recorded packets for protocol-level analysis."
                ],
                "correctIndex": 0,
                "explanation": "Time sync matters in objective 3.2 because Accurate clocks needed to correlate events. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-002",
                "objective": "3.2",
                "domain": 3,
                "prompt": "The WAN feels slow every afternoon, but no interface errors are reported. Which monitoring data helps identify the cause?",
                "options": [
                  "A cable toner test on every wall jack.",
                  "A DNS PTR lookup for the firewall.",
                  "A guest Wi-Fi captive portal screenshot.",
                  "Baseline utilization and flow data showing whether traffic volume or top talkers changed."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.2, Network Monitoring Technologies. Baseline utilization and flow data showing whether traffic volume or top talkers changed. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-003",
                "objective": "3.2",
                "domain": 3,
                "prompt": "Before changing production settings for Network Monitoring Technologies, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare baselines, counters, flow records, logs, captures, and alert timing.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.2: compare baselines, counters, flow records, logs, captures, and alert timing. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-004",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A help desk note says: \"The WAN feels slow every afternoon, but no interface errors are reported.\" What is the best interpretation?",
                "options": [
                  "A guest Wi-Fi captive portal screenshot.",
                  "Baseline utilization and flow data showing whether traffic volume or top talkers changed.",
                  "A cable toner test on every wall jack.",
                  "A DNS PTR lookup for the firewall."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Monitoring Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-005",
                "objective": "3.2",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.2, Network Monitoring Technologies?",
                "options": [
                  "Evidence that lets the technician compare baselines, counters, flow records, logs, captures, and alert timing.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Monitoring Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-006",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Interface errors?",
                "options": [
                  "Centralized event logging from network devices and systems.",
                  "Device-generated alert sent to a monitoring system.",
                  "Known-normal performance or behavior used for comparison.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 3,
                "explanation": "Interface errors matters in objective 3.2 because Counters such as CRC or drops that indicate link trouble. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-007",
                "objective": "3.2",
                "domain": 3,
                "prompt": "The WAN feels slow every afternoon, but no interface errors are reported. Which monitoring data helps identify the cause?",
                "options": [
                  "A DNS PTR lookup for the firewall.",
                  "A guest Wi-Fi captive portal screenshot.",
                  "Baseline utilization and flow data showing whether traffic volume or top talkers changed.",
                  "A cable toner test on every wall jack."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 3.2, Network Monitoring Technologies. Baseline utilization and flow data showing whether traffic volume or top talkers changed. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-008",
                "objective": "3.2",
                "domain": 3,
                "prompt": "Before changing production settings for Network Monitoring Technologies, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare baselines, counters, flow records, logs, captures, and alert timing.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 3.2: compare baselines, counters, flow records, logs, captures, and alert timing. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-009",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A help desk note says: \"The WAN feels slow every afternoon, but no interface errors are reported.\" What is the best interpretation?",
                "options": [
                  "Baseline utilization and flow data showing whether traffic volume or top talkers changed.",
                  "A cable toner test on every wall jack.",
                  "A DNS PTR lookup for the firewall.",
                  "A guest Wi-Fi captive portal screenshot."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Monitoring Technologies, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n32-network-monitoring-technologies-010",
                "objective": "3.2",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.2, Network Monitoring Technologies?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician compare baselines, counters, flow records, logs, captures, and alert timing."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Monitoring Technologies, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n33-disaster-recovery-concepts-section",
        "title": "Section 3.3 - Disaster Recovery Concepts",
        "summary": "Explain RPO, RTO, MTTR, MTBF, DR sites, backups, and testing.",
        "activities": [
          {
            "id": "n33-disaster-recovery-concepts-lesson",
            "type": "lesson",
            "title": "Disaster Recovery Concepts",
            "duration": 18,
            "required": true,
            "domain": 3,
            "objective": "3.3",
            "difficulty": "applied",
            "summary": "Disaster recovery is planning for serious failure before it happens. In networking, that can mean loss of a circuit, switch stack, building, cloud region, DNS provider, power system, or configuration database. The goal is to restore service predictably instead of improvising during stress.",
            "learningObjectives": [
              "Explain disaster recovery terms in network operations",
              "Compare redundancy, backups, sites, and exercises",
              "Connect recovery targets to design choices"
            ],
            "headings": [
              "What disaster recovery protects",
              "RPO, RTO, MTTR, and MTBF",
              "Sites and redundancy",
              "Backups and testing",
              "Planning evidence",
              "Mastery target"
            ],
            "content": [
              "Disaster recovery is planning for serious failure before it happens. In networking, that can mean loss of a circuit, switch stack, building, cloud region, DNS provider, power system, or configuration database. The goal is to restore service predictably instead of improvising during stress.",
              "RPO is how much data loss is acceptable, measured backward from the incident. RTO is how quickly service must be restored. MTTR is the average time to repair or recover. MTBF is the average time between failures. These numbers influence whether a design needs redundancy, standby equipment, automation, or manual recovery.",
              "Hot, warm, and cold sites describe different recovery readiness levels. A hot site is ready quickly and costs more. A warm site has some infrastructure prepared. A cold site provides space or basics but requires more setup. Redundant links, devices, power, and cloud regions reduce single points of failure.",
              "Backups must be current, protected, and restorable. Configuration backups are especially important for switches, routers, firewalls, controllers, and infrastructure services. A backup that has never been restored is only a hope, not a proven recovery plan.",
              "DR evidence includes recovery plans, dependency maps, backup logs, replication status, failover test results, tabletop exercise notes, and post-incident reports. A realistic test often exposes missing credentials, undocumented dependencies, or DNS changes nobody planned.",
              "Mastery means you can match recovery requirements to a design and explain why a chosen recovery method meets RPO, RTO, availability, and cost needs."
            ]
          },
          {
            "id": "n33-disaster-recovery-concepts-scenario",
            "type": "scenario",
            "title": "Worked scenario - Disaster Recovery Concepts",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.3",
            "difficulty": "applied",
            "summary": "Apply disaster recovery concepts to a realistic Network+ decision.",
            "evidence": [
              "Leadership says the network service must be restored within one hour after a site failure.",
              "The objective evidence should let the technician match recovery targets to redundancy, backups, sites, and tested procedures.",
              "The decision should preserve service while narrowing disaster recovery concepts to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "RTO, the maximum acceptable time to restore service.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician match recovery targets to redundancy, backups, sites, and tested procedures.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Disaster Recovery Concepts scenario is testing objective 3.3. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n33-disaster-recovery-concepts-cards",
            "type": "flashcards",
            "title": "Disaster Recovery Concepts flashcards",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.3",
            "difficulty": "applied",
            "summary": "Practice the terms needed for objective 3.3.",
            "cards": [
              [
                "RPO",
                "Maximum acceptable data loss measured in time."
              ],
              [
                "RTO",
                "Maximum acceptable time to restore service."
              ],
              [
                "MTTR",
                "Mean time to repair or recover."
              ],
              [
                "MTBF",
                "Mean time between failures."
              ],
              [
                "Hot site",
                "Recovery site kept ready for rapid failover."
              ],
              [
                "Warm site",
                "Partially prepared recovery site."
              ],
              [
                "Cold site",
                "Basic recovery location requiring significant setup."
              ],
              [
                "Configuration backup",
                "Saved device settings needed for recovery."
              ],
              [
                "Failover",
                "Moving service to a redundant path, device, or site."
              ],
              [
                "Tabletop exercise",
                "Discussion-based rehearsal of an incident or recovery plan."
              ],
              [
                "Single point of failure",
                "One component whose failure interrupts service."
              ],
              [
                "Post-incident review",
                "Review of what happened and how to improve."
              ]
            ]
          },
          {
            "id": "n33-disaster-recovery-concepts-check",
            "type": "quiz",
            "title": "Disaster Recovery Concepts coached check",
            "duration": 8,
            "required": true,
            "domain": 3,
            "objective": "3.3",
            "difficulty": "applied",
            "summary": "Five coached questions for objective 3.3.",
            "questions": [
              {
                "id": "check-n33-disaster-recovery-concepts-001",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n33-disaster-recovery-concepts-002",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Leadership says the network service must be restored within one hour after a site failure. Which disaster recovery metric is being defined?",
                "options": [
                  "RPO, the acceptable amount of data loss.",
                  "MTBF, the expected time between failures.",
                  "APIPA, the self-assigned address range.",
                  "RTO, the maximum acceptable time to restore service."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.3, Disaster Recovery Concepts. RTO, the maximum acceptable time to restore service. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n33-disaster-recovery-concepts-003",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Before changing production settings for Disaster Recovery Concepts, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match recovery targets to redundancy, backups, sites, and tested procedures.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.3: match recovery targets to redundancy, backups, sites, and tested procedures. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n33-disaster-recovery-concepts-004",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A help desk note says: \"Leadership says the network service must be restored within one hour after a site failure.\" What is the best interpretation?",
                "options": [
                  "APIPA, the self-assigned address range.",
                  "RTO, the maximum acceptable time to restore service.",
                  "RPO, the acceptable amount of data loss.",
                  "MTBF, the expected time between failures."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Disaster Recovery Concepts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n33-disaster-recovery-concepts-005",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.3, Disaster Recovery Concepts?",
                "options": [
                  "Evidence that lets the technician match recovery targets to redundancy, backups, sites, and tested procedures.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Disaster Recovery Concepts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n33-disaster-recovery-concepts-quiz",
            "type": "quiz",
            "title": "Disaster Recovery Concepts section quiz",
            "duration": 12,
            "required": true,
            "domain": 3,
            "objective": "3.3",
            "difficulty": "applied",
            "summary": "Ten section quiz questions for objective 3.3.",
            "questions": [
              {
                "id": "quiz-n33-disaster-recovery-concepts-001",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches Post-incident review?",
                "options": [
                  "Review of what happened and how to improve.",
                  "Discussion-based rehearsal of an incident or recovery plan.",
                  "Saved device settings needed for recovery.",
                  "Partially prepared recovery site."
                ],
                "correctIndex": 0,
                "explanation": "Post-incident review matters in objective 3.3 because Review of what happened and how to improve. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-002",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Leadership says the network service must be restored within one hour after a site failure. Which disaster recovery metric is being defined?",
                "options": [
                  "RPO, the acceptable amount of data loss.",
                  "MTBF, the expected time between failures.",
                  "APIPA, the self-assigned address range.",
                  "RTO, the maximum acceptable time to restore service."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.3, Disaster Recovery Concepts. RTO, the maximum acceptable time to restore service. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-003",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Before changing production settings for Disaster Recovery Concepts, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match recovery targets to redundancy, backups, sites, and tested procedures.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.3: match recovery targets to redundancy, backups, sites, and tested procedures. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-004",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A help desk note says: \"Leadership says the network service must be restored within one hour after a site failure.\" What is the best interpretation?",
                "options": [
                  "APIPA, the self-assigned address range.",
                  "RTO, the maximum acceptable time to restore service.",
                  "RPO, the acceptable amount of data loss.",
                  "MTBF, the expected time between failures."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Disaster Recovery Concepts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-005",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.3, Disaster Recovery Concepts?",
                "options": [
                  "Evidence that lets the technician match recovery targets to redundancy, backups, sites, and tested procedures.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Disaster Recovery Concepts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-006",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches Cold site?",
                "options": [
                  "Recovery site kept ready for rapid failover.",
                  "Mean time to repair or recover.",
                  "Maximum acceptable data loss measured in time.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 3,
                "explanation": "Cold site matters in objective 3.3 because Basic recovery location requiring significant setup. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-007",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Leadership says the network service must be restored within one hour after a site failure. Which disaster recovery metric is being defined?",
                "options": [
                  "MTBF, the expected time between failures.",
                  "APIPA, the self-assigned address range.",
                  "RTO, the maximum acceptable time to restore service.",
                  "RPO, the acceptable amount of data loss."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 3.3, Disaster Recovery Concepts. RTO, the maximum acceptable time to restore service. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-008",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Before changing production settings for Disaster Recovery Concepts, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should match recovery targets to redundancy, backups, sites, and tested procedures.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 3.3: match recovery targets to redundancy, backups, sites, and tested procedures. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-009",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A help desk note says: \"Leadership says the network service must be restored within one hour after a site failure.\" What is the best interpretation?",
                "options": [
                  "RTO, the maximum acceptable time to restore service.",
                  "RPO, the acceptable amount of data loss.",
                  "MTBF, the expected time between failures.",
                  "APIPA, the self-assigned address range."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Disaster Recovery Concepts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n33-disaster-recovery-concepts-010",
                "objective": "3.3",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.3, Disaster Recovery Concepts?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician match recovery targets to redundancy, backups, sites, and tested procedures."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Disaster Recovery Concepts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n34-ipv4-and-ipv6-network-services-section",
        "title": "Section 3.4 - IPv4 and IPv6 Network Services",
        "summary": "Implement DHCP, DNS, NTP/PTP, reservations, records, scopes, and relays.",
        "activities": [
          {
            "id": "n34-ipv4-and-ipv6-network-services-lesson",
            "type": "lesson",
            "title": "IPv4 and IPv6 Network Services",
            "duration": 18,
            "required": true,
            "domain": 3,
            "objective": "3.4",
            "difficulty": "applied",
            "summary": "IP networks need services that make addresses usable. A host may have a working cable and VLAN, but without correct addressing, naming, and time, applications fail in confusing ways. Network+ expects learners to connect symptoms to services such as DHCP, DNS, NTP, PTP, and IPAM.",
            "learningObjectives": [
              "Explain core IPv4 and IPv6 network services",
              "Compare DHCP, DNS, NTP/PTP, IPAM, and relay behavior",
              "Troubleshoot service symptoms using client and server evidence"
            ],
            "headings": [
              "Services that make addressing usable",
              "DHCP and address assignment",
              "DNS and name resolution",
              "Time and management services",
              "Troubleshooting evidence",
              "Mastery target"
            ],
            "content": [
              "IP networks need services that make addresses usable. A host may have a working cable and VLAN, but without correct addressing, naming, and time, applications fail in confusing ways. Network+ expects learners to connect symptoms to services such as DHCP, DNS, NTP, PTP, and IPAM.",
              "DHCP automatically gives clients IP settings such as address, mask, gateway, DNS servers, lease time, and options. A scope defines the address pool. A reservation gives a predictable address to a known client. A relay agent forwards DHCP messages between client VLANs and a DHCP server on another network.",
              "DNS maps names to addresses and other records. A records map names to IPv4, AAAA records to IPv6, CNAME records to aliases, MX records to mail exchangers, PTR records to reverse lookup, and TXT records to text values used by many services. DNS can fail even when IP connectivity is fine.",
              "NTP keeps systems synchronized for logs, authentication, certificates, and troubleshooting correlation. PTP provides more precise time in environments that need it. IPAM tracks address usage so teams avoid duplicates, exhaustion, and undocumented static assignments.",
              "Troubleshooting evidence includes client IP configuration, lease status, DHCP scope utilization, DNS query results, record TTL, relay configuration, server logs, duplicate address alerts, and time offset. A 169.254 address points toward DHCP failure; a successful ping by IP but not name points toward DNS.",
              "Mastery means you can separate address assignment problems from name resolution problems, time problems, duplicate IP problems, and routing problems."
            ]
          },
          {
            "id": "n34-ipv4-and-ipv6-network-services-scenario",
            "type": "scenario",
            "title": "Worked scenario - IPv4 and IPv6 Network Services",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.4",
            "difficulty": "applied",
            "summary": "Apply ipv4 and ipv6 network services to a realistic Network+ decision.",
            "evidence": [
              "Clients in a new VLAN do not receive addresses, but clients in the server VLAN do.",
              "The objective evidence should let the technician check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration.",
              "The decision should preserve service while narrowing ipv4 and ipv6 network services to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "DHCP scope or relay configuration for the new VLAN.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This IPv4 and IPv6 Network Services scenario is testing objective 3.4. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n34-ipv4-and-ipv6-network-services-cards",
            "type": "flashcards",
            "title": "IPv4 and IPv6 Network Services flashcards",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.4",
            "difficulty": "applied",
            "summary": "Practice the terms needed for objective 3.4.",
            "cards": [
              [
                "DHCP",
                "Automatically assigns IP configuration to clients."
              ],
              [
                "DHCP scope",
                "Pool of addresses and options for a subnet."
              ],
              [
                "DHCP reservation",
                "Predictable lease for a known client."
              ],
              [
                "DHCP relay",
                "Forwards DHCP traffic between clients and remote servers."
              ],
              [
                "DNS",
                "Name resolution service."
              ],
              [
                "A record",
                "DNS record mapping a name to IPv4."
              ],
              [
                "AAAA record",
                "DNS record mapping a name to IPv6."
              ],
              [
                "CNAME",
                "DNS alias record."
              ],
              [
                "MX record",
                "DNS mail exchanger record."
              ],
              [
                "PTR record",
                "Reverse DNS lookup record."
              ],
              [
                "NTP",
                "Network Time Protocol for clock synchronization."
              ],
              [
                "IPAM",
                "IP address management system or process."
              ]
            ]
          },
          {
            "id": "n34-ipv4-and-ipv6-network-services-check",
            "type": "quiz",
            "title": "IPv4 and IPv6 Network Services coached check",
            "duration": 8,
            "required": true,
            "domain": 3,
            "objective": "3.4",
            "difficulty": "applied",
            "summary": "Five coached questions for objective 3.4.",
            "questions": [
              {
                "id": "check-n34-ipv4-and-ipv6-network-services-001",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n34-ipv4-and-ipv6-network-services-002",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Clients in a new VLAN do not receive addresses, but clients in the server VLAN do. Which service configuration is most suspect?",
                "options": [
                  "The web server certificate common name.",
                  "The wireless roaming threshold.",
                  "The fiber connector polish type only.",
                  "DHCP scope or relay configuration for the new VLAN."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.4, IPv4 and IPv6 Network Services. DHCP scope or relay configuration for the new VLAN. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n34-ipv4-and-ipv6-network-services-003",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Before changing production settings for IPv4 and IPv6 Network Services, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.4: check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n34-ipv4-and-ipv6-network-services-004",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A help desk note says: \"Clients in a new VLAN do not receive addresses, but clients in the server VLAN do.\" What is the best interpretation?",
                "options": [
                  "The fiber connector polish type only.",
                  "DHCP scope or relay configuration for the new VLAN.",
                  "The web server certificate common name.",
                  "The wireless roaming threshold."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For IPv4 and IPv6 Network Services, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n34-ipv4-and-ipv6-network-services-005",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.4, IPv4 and IPv6 Network Services?",
                "options": [
                  "Evidence that lets the technician check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For IPv4 and IPv6 Network Services, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n34-ipv4-and-ipv6-network-services-quiz",
            "type": "quiz",
            "title": "IPv4 and IPv6 Network Services section quiz",
            "duration": 12,
            "required": true,
            "domain": 3,
            "objective": "3.4",
            "difficulty": "applied",
            "summary": "Ten section quiz questions for objective 3.4.",
            "questions": [
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-001",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches IPAM?",
                "options": [
                  "IP address management system or process.",
                  "Reverse DNS lookup record.",
                  "DNS record mapping a name to IPv6.",
                  "Name resolution service."
                ],
                "correctIndex": 0,
                "explanation": "IPAM matters in objective 3.4 because IP address management system or process. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-002",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Clients in a new VLAN do not receive addresses, but clients in the server VLAN do. Which service configuration is most suspect?",
                "options": [
                  "The web server certificate common name.",
                  "The wireless roaming threshold.",
                  "The fiber connector polish type only.",
                  "DHCP scope or relay configuration for the new VLAN."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.4, IPv4 and IPv6 Network Services. DHCP scope or relay configuration for the new VLAN. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-003",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Before changing production settings for IPv4 and IPv6 Network Services, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.4: check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-004",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A help desk note says: \"Clients in a new VLAN do not receive addresses, but clients in the server VLAN do.\" What is the best interpretation?",
                "options": [
                  "The fiber connector polish type only.",
                  "DHCP scope or relay configuration for the new VLAN.",
                  "The web server certificate common name.",
                  "The wireless roaming threshold."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For IPv4 and IPv6 Network Services, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-005",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.4, IPv4 and IPv6 Network Services?",
                "options": [
                  "Evidence that lets the technician check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For IPv4 and IPv6 Network Services, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-006",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches A record?",
                "options": [
                  "Forwards DHCP traffic between clients and remote servers.",
                  "Pool of addresses and options for a subnet.",
                  "IP address management system or process.",
                  "DNS record mapping a name to IPv4."
                ],
                "correctIndex": 3,
                "explanation": "A record matters in objective 3.4 because DNS record mapping a name to IPv4. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-007",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Clients in a new VLAN do not receive addresses, but clients in the server VLAN do. Which service configuration is most suspect?",
                "options": [
                  "The wireless roaming threshold.",
                  "The fiber connector polish type only.",
                  "DHCP scope or relay configuration for the new VLAN.",
                  "The web server certificate common name."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 3.4, IPv4 and IPv6 Network Services. DHCP scope or relay configuration for the new VLAN. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-008",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Before changing production settings for IPv4 and IPv6 Network Services, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 3.4: check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-009",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A help desk note says: \"Clients in a new VLAN do not receive addresses, but clients in the server VLAN do.\" What is the best interpretation?",
                "options": [
                  "DHCP scope or relay configuration for the new VLAN.",
                  "The web server certificate common name.",
                  "The wireless roaming threshold.",
                  "The fiber connector polish type only."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For IPv4 and IPv6 Network Services, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n34-ipv4-and-ipv6-network-services-010",
                "objective": "3.4",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.4, IPv4 and IPv6 Network Services?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician check DHCP scope, relay, DNS records, NTP, IPAM, and client configuration."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For IPv4 and IPv6 Network Services, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n35-remote-access-methods-section",
        "title": "Section 3.5 - Remote Access Methods",
        "summary": "Compare VPN types, jump hosts, in-band/out-of-band management, SSH, RDP, and GUI access.",
        "activities": [
          {
            "id": "n35-remote-access-methods-lesson",
            "type": "lesson",
            "title": "Remote Access Methods",
            "duration": 18,
            "required": true,
            "domain": 3,
            "objective": "3.5",
            "difficulty": "applied",
            "summary": "Remote access lets users and administrators reach resources without being physically on the local network. It must balance convenience, encryption, identity, authorization, device posture, logging, and least privilege. A remote access method is not secure simply because it is encrypted.",
            "learningObjectives": [
              "Compare common remote access methods",
              "Explain VPN, jump host, VDI, SSH, RDP, and out-of-band use cases",
              "Choose secure remote access evidence and controls"
            ],
            "headings": [
              "Why remote access needs design",
              "VPN patterns",
              "Administrative access",
              "Out-of-band and hosted desktops",
              "Security and troubleshooting evidence",
              "Mastery target"
            ],
            "content": [
              "Remote access lets users and administrators reach resources without being physically on the local network. It must balance convenience, encryption, identity, authorization, device posture, logging, and least privilege. A remote access method is not secure simply because it is encrypted.",
              "A site-to-site VPN connects networks, such as a branch office to a data center or cloud VPC. A client-to-site VPN connects an individual endpoint to a private network. Full tunnel sends all client traffic through the VPN. Split tunnel sends only selected traffic through the VPN and leaves other traffic local.",
              "Administrative access often uses SSH for command-line management or RDP for Windows graphical sessions. A jump host centralizes administrative entry into sensitive networks so direct access to servers or network devices is limited. MFA and logging are expected controls.",
              "Out-of-band management uses a separate management path, such as console server, cellular modem, or dedicated management network, so administrators can recover devices when the production network is down. VDI and remote desktop services can keep data in the data center while users interact remotely.",
              "Troubleshooting evidence includes authentication logs, VPN tunnel status, assigned client IP, route table, DNS settings, MFA events, firewall logs, split-tunnel policy, and endpoint posture. If the tunnel connects but internal names fail, DNS or search suffix configuration may be the issue.",
              "Mastery means you can match the remote access method to the use case and identify the control or evidence needed to make it reliable and defensible."
            ]
          },
          {
            "id": "n35-remote-access-methods-scenario",
            "type": "scenario",
            "title": "Worked scenario - Remote Access Methods",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.5",
            "difficulty": "applied",
            "summary": "Apply remote access methods to a realistic Network+ decision.",
            "evidence": [
              "A remote administrator needs device console access even when the production WAN is down.",
              "The objective evidence should let the technician validate identity, tunnel state, routes, DNS, MFA, logs, and management path.",
              "The decision should preserve service while narrowing remote access methods to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Out-of-band management through a separate management path.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician validate identity, tunnel state, routes, DNS, MFA, logs, and management path.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Remote Access Methods scenario is testing objective 3.5. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n35-remote-access-methods-cards",
            "type": "flashcards",
            "title": "Remote Access Methods flashcards",
            "duration": 10,
            "required": true,
            "domain": 3,
            "objective": "3.5",
            "difficulty": "applied",
            "summary": "Practice the terms needed for objective 3.5.",
            "cards": [
              [
                "Site-to-site VPN",
                "Encrypted connection between networks."
              ],
              [
                "Client-to-site VPN",
                "Encrypted remote access connection from one endpoint."
              ],
              [
                "Full tunnel",
                "All client traffic traverses the VPN."
              ],
              [
                "Split tunnel",
                "Only selected traffic traverses the VPN."
              ],
              [
                "SSH",
                "Secure command-line remote access, commonly port 22."
              ],
              [
                "RDP",
                "Windows remote desktop access, commonly port 3389."
              ],
              [
                "Jump host",
                "Controlled intermediary used for administrative access."
              ],
              [
                "Out-of-band management",
                "Separate management path used when production access fails."
              ],
              [
                "MFA",
                "Multiple factors used to strengthen authentication."
              ],
              [
                "VDI",
                "Virtual desktop infrastructure for hosted user desktops."
              ],
              [
                "Posture check",
                "Validation of endpoint health before access."
              ],
              [
                "VPN concentrator",
                "Device or service terminating VPN connections."
              ]
            ]
          },
          {
            "id": "n35-remote-access-methods-check",
            "type": "quiz",
            "title": "Remote Access Methods coached check",
            "duration": 8,
            "required": true,
            "domain": 3,
            "objective": "3.5",
            "difficulty": "applied",
            "summary": "Five coached questions for objective 3.5.",
            "questions": [
              {
                "id": "check-n35-remote-access-methods-001",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n35-remote-access-methods-002",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A remote administrator needs device console access even when the production WAN is down. Which access method fits best?",
                "options": [
                  "Split tunneling for ordinary internet browsing.",
                  "A DNS CNAME record.",
                  "A guest captive portal.",
                  "Out-of-band management through a separate management path."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.5, Remote Access Methods. Out-of-band management through a separate management path. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n35-remote-access-methods-003",
                "objective": "3.5",
                "domain": 3,
                "prompt": "Before changing production settings for Remote Access Methods, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should validate identity, tunnel state, routes, DNS, MFA, logs, and management path.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.5: validate identity, tunnel state, routes, DNS, MFA, logs, and management path. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n35-remote-access-methods-004",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A help desk note says: \"A remote administrator needs device console access even when the production WAN is down.\" What is the best interpretation?",
                "options": [
                  "A guest captive portal.",
                  "Out-of-band management through a separate management path.",
                  "Split tunneling for ordinary internet browsing.",
                  "A DNS CNAME record."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Remote Access Methods, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n35-remote-access-methods-005",
                "objective": "3.5",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.5, Remote Access Methods?",
                "options": [
                  "Evidence that lets the technician validate identity, tunnel state, routes, DNS, MFA, logs, and management path.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Remote Access Methods, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n35-remote-access-methods-quiz",
            "type": "quiz",
            "title": "Remote Access Methods section quiz",
            "duration": 12,
            "required": true,
            "domain": 3,
            "objective": "3.5",
            "difficulty": "applied",
            "summary": "Ten section quiz questions for objective 3.5.",
            "questions": [
              {
                "id": "quiz-n35-remote-access-methods-001",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Remote Access Methods. Which description correctly matches VPN concentrator?",
                "options": [
                  "Device or service terminating VPN connections.",
                  "Virtual desktop infrastructure for hosted user desktops.",
                  "Separate management path used when production access fails.",
                  "Windows remote desktop access, commonly port 3389."
                ],
                "correctIndex": 0,
                "explanation": "VPN concentrator matters in objective 3.5 because Device or service terminating VPN connections. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-002",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A remote administrator needs device console access even when the production WAN is down. Which access method fits best?",
                "options": [
                  "Split tunneling for ordinary internet browsing.",
                  "A DNS CNAME record.",
                  "A guest captive portal.",
                  "Out-of-band management through a separate management path."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 3.5, Remote Access Methods. Out-of-band management through a separate management path. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-003",
                "objective": "3.5",
                "domain": 3,
                "prompt": "Before changing production settings for Remote Access Methods, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should validate identity, tunnel state, routes, DNS, MFA, logs, and management path.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 3.5: validate identity, tunnel state, routes, DNS, MFA, logs, and management path. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-004",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A help desk note says: \"A remote administrator needs device console access even when the production WAN is down.\" What is the best interpretation?",
                "options": [
                  "A guest captive portal.",
                  "Out-of-band management through a separate management path.",
                  "Split tunneling for ordinary internet browsing.",
                  "A DNS CNAME record."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Remote Access Methods, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-005",
                "objective": "3.5",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.5, Remote Access Methods?",
                "options": [
                  "Evidence that lets the technician validate identity, tunnel state, routes, DNS, MFA, logs, and management path.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Remote Access Methods, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-006",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Jump host?",
                "options": [
                  "Secure command-line remote access, commonly port 22.",
                  "All client traffic traverses the VPN.",
                  "Encrypted connection between networks.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 3,
                "explanation": "Jump host matters in objective 3.5 because Controlled intermediary used for administrative access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-007",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A remote administrator needs device console access even when the production WAN is down. Which access method fits best?",
                "options": [
                  "A DNS CNAME record.",
                  "A guest captive portal.",
                  "Out-of-band management through a separate management path.",
                  "Split tunneling for ordinary internet browsing."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 3.5, Remote Access Methods. Out-of-band management through a separate management path. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-008",
                "objective": "3.5",
                "domain": 3,
                "prompt": "Before changing production settings for Remote Access Methods, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should validate identity, tunnel state, routes, DNS, MFA, logs, and management path.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 3.5: validate identity, tunnel state, routes, DNS, MFA, logs, and management path. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-009",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A help desk note says: \"A remote administrator needs device console access even when the production WAN is down.\" What is the best interpretation?",
                "options": [
                  "Out-of-band management through a separate management path.",
                  "Split tunneling for ordinary internet browsing.",
                  "A DNS CNAME record.",
                  "A guest captive portal."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Remote Access Methods, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n35-remote-access-methods-010",
                "objective": "3.5",
                "domain": 3,
                "prompt": "Which evidence would most improve confidence when working through objective 3.5, Remote Access Methods?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician validate identity, tunnel state, routes, DNS, MFA, logs, and management path."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Remote Access Methods, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "t3-final-section",
        "title": "Tier 3 final checkpoint",
        "summary": "Mixed review for Network Operations.",
        "activities": [
          {
            "id": "t3-checkpoint",
            "type": "checkpoint",
            "title": "Tier 3 cumulative checkpoint",
            "duration": 25,
            "required": true,
            "domain": 3,
            "objective": "Tier 3 synthesis",
            "difficulty": "applied",
            "summary": "Twenty mixed questions covering Network Operations.",
            "questions": [
              {
                "id": "checkpoint-tier-3-001-001",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-002-001",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-003-001",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-004-001",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-005-001",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-006-001",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-007-001",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-008-001",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-009-001",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-010-001",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-011-001",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-012-001",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-013-001",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-014-001",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-015-001",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-016-001",
                "objective": "3.1",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-017-001",
                "objective": "3.2",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-018-001",
                "objective": "3.3",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-019-001",
                "objective": "3.4",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-3-020-001",
                "objective": "3.5",
                "domain": 3,
                "prompt": "A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tier-4",
    "number": 4,
    "title": "Network Security",
    "subtitle": "Go from zero to fluent in network security.",
    "difficulty": "advanced",
    "color": "#e78cff",
    "minutes": 181,
    "recommendedAfter": 3,
    "modules": [
      {
        "id": "n41-basic-network-security-concepts-section",
        "title": "Section 4.1 - Basic Network Security Concepts",
        "summary": "Explain segmentation, authorization, least privilege, RBAC, and encryption in transit.",
        "activities": [
          {
            "id": "n41-basic-network-security-concepts-lesson",
            "type": "lesson",
            "title": "Basic Network Security Concepts",
            "duration": 18,
            "required": true,
            "domain": 4,
            "objective": "4.1",
            "difficulty": "advanced",
            "summary": "Network security starts with designing who and what can communicate. A flat network lets too much traffic move too easily. A secure network uses identity, authorization, segmentation, encryption, monitoring, and policy to reduce the blast radius of mistakes or attacks.",
            "learningObjectives": [
              "Explain foundational network security concepts",
              "Connect segmentation, authorization, least privilege, and encryption to network design",
              "Identify basic controls from scenario clues"
            ],
            "headings": [
              "Security as network design",
              "Identity and authorization",
              "Segmentation and least privilege",
              "Encryption and trust boundaries",
              "Security evidence",
              "Mastery target"
            ],
            "content": [
              "Network security starts with designing who and what can communicate. A flat network lets too much traffic move too easily. A secure network uses identity, authorization, segmentation, encryption, monitoring, and policy to reduce the blast radius of mistakes or attacks.",
              "Authentication proves identity. Authorization decides what an authenticated subject may do. Accounting records what happened. Role-based access control assigns permissions through roles instead of one-off exceptions. Least privilege grants only the access required for the task.",
              "Segmentation divides the network into zones or VLANs so sensitive systems are not exposed to every user or device. Examples include separating guest Wi-Fi, voice, user workstations, servers, management interfaces, and payment systems. Firewalls, ACLs, and NAC can enforce segmentation.",
              "Encryption in transit protects data crossing untrusted or shared networks. TLS, IPsec, and secure management protocols reduce exposure. Trust boundaries matter: traffic that crosses from user networks into server zones or from the internet into internal systems needs explicit policy.",
              "Security evidence includes authentication logs, group membership, firewall hits, ACL counters, NAC posture result, certificate status, and traffic captures. If access fails for one user but not others, identity or authorization is more likely than routing.",
              "Mastery means you can look at a scenario and explain which basic security concept is being tested and why the control reduces risk without breaking legitimate work."
            ]
          },
          {
            "id": "n41-basic-network-security-concepts-scenario",
            "type": "scenario",
            "title": "Worked scenario - Basic Network Security Concepts",
            "duration": 10,
            "required": true,
            "domain": 4,
            "objective": "4.1",
            "difficulty": "advanced",
            "summary": "Apply basic network security concepts to a realistic Network+ decision.",
            "evidence": [
              "A contractor should reach one ticketing app but no internal server subnets.",
              "The objective evidence should let the technician check identity, authorization, segmentation, encryption, and trust boundaries.",
              "The decision should preserve service while narrowing basic network security concepts to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Least privilege enforced with authorization and segmentation.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician check identity, authorization, segmentation, encryption, and trust boundaries.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Basic Network Security Concepts scenario is testing objective 4.1. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n41-basic-network-security-concepts-cards",
            "type": "flashcards",
            "title": "Basic Network Security Concepts flashcards",
            "duration": 10,
            "required": true,
            "domain": 4,
            "objective": "4.1",
            "difficulty": "advanced",
            "summary": "Practice the terms needed for objective 4.1.",
            "cards": [
              [
                "Authentication",
                "Proving identity."
              ],
              [
                "Authorization",
                "Determining what an identity may access."
              ],
              [
                "Accounting",
                "Recording activity for review and audit."
              ],
              [
                "RBAC",
                "Permissions assigned through roles."
              ],
              [
                "Least privilege",
                "Granting only the access needed."
              ],
              [
                "Segmentation",
                "Dividing networks into controlled zones."
              ],
              [
                "ACL",
                "Rule list that permits or denies traffic."
              ],
              [
                "NAC",
                "Network access control based on identity or posture."
              ],
              [
                "TLS",
                "Encryption commonly used to protect application traffic."
              ],
              [
                "IPsec",
                "Protocol suite for encrypted IP communication."
              ],
              [
                "Management network",
                "Restricted network for administration traffic."
              ],
              [
                "Trust boundary",
                "Point where traffic crosses between different risk zones."
              ]
            ]
          },
          {
            "id": "n41-basic-network-security-concepts-check",
            "type": "quiz",
            "title": "Basic Network Security Concepts coached check",
            "duration": 8,
            "required": true,
            "domain": 4,
            "objective": "4.1",
            "difficulty": "advanced",
            "summary": "Five coached questions for objective 4.1.",
            "questions": [
              {
                "id": "check-n41-basic-network-security-concepts-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n41-basic-network-security-concepts-002",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A contractor should reach one ticketing app but no internal server subnets. Which security principle is most relevant?",
                "options": [
                  "Full mesh routing between all VLANs.",
                  "Public DHCP for every server.",
                  "Disabling encryption to simplify access.",
                  "Least privilege enforced with authorization and segmentation."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 4.1, Basic Network Security Concepts. Least privilege enforced with authorization and segmentation. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n41-basic-network-security-concepts-003",
                "objective": "4.1",
                "domain": 4,
                "prompt": "Before changing production settings for Basic Network Security Concepts, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check identity, authorization, segmentation, encryption, and trust boundaries.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 4.1: check identity, authorization, segmentation, encryption, and trust boundaries. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n41-basic-network-security-concepts-004",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A help desk note says: \"A contractor should reach one ticketing app but no internal server subnets.\" What is the best interpretation?",
                "options": [
                  "Disabling encryption to simplify access.",
                  "Least privilege enforced with authorization and segmentation.",
                  "Full mesh routing between all VLANs.",
                  "Public DHCP for every server."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Basic Network Security Concepts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n41-basic-network-security-concepts-005",
                "objective": "4.1",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.1, Basic Network Security Concepts?",
                "options": [
                  "Evidence that lets the technician check identity, authorization, segmentation, encryption, and trust boundaries.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Basic Network Security Concepts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n41-basic-network-security-concepts-quiz",
            "type": "quiz",
            "title": "Basic Network Security Concepts section quiz",
            "duration": 12,
            "required": true,
            "domain": 4,
            "objective": "4.1",
            "difficulty": "advanced",
            "summary": "Ten section quiz questions for objective 4.1.",
            "questions": [
              {
                "id": "quiz-n41-basic-network-security-concepts-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Trust boundary?",
                "options": [
                  "Point where traffic crosses between different risk zones.",
                  "Protocol suite for encrypted IP communication.",
                  "Network access control based on identity or posture.",
                  "Dividing networks into controlled zones."
                ],
                "correctIndex": 0,
                "explanation": "Trust boundary matters in objective 4.1 because Point where traffic crosses between different risk zones. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-002",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A contractor should reach one ticketing app but no internal server subnets. Which security principle is most relevant?",
                "options": [
                  "Full mesh routing between all VLANs.",
                  "Public DHCP for every server.",
                  "Disabling encryption to simplify access.",
                  "Least privilege enforced with authorization and segmentation."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 4.1, Basic Network Security Concepts. Least privilege enforced with authorization and segmentation. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-003",
                "objective": "4.1",
                "domain": 4,
                "prompt": "Before changing production settings for Basic Network Security Concepts, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check identity, authorization, segmentation, encryption, and trust boundaries.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 4.1: check identity, authorization, segmentation, encryption, and trust boundaries. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-004",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A help desk note says: \"A contractor should reach one ticketing app but no internal server subnets.\" What is the best interpretation?",
                "options": [
                  "Disabling encryption to simplify access.",
                  "Least privilege enforced with authorization and segmentation.",
                  "Full mesh routing between all VLANs.",
                  "Public DHCP for every server."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Basic Network Security Concepts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-005",
                "objective": "4.1",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.1, Basic Network Security Concepts?",
                "options": [
                  "Evidence that lets the technician check identity, authorization, segmentation, encryption, and trust boundaries.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Basic Network Security Concepts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-006",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches ACL?",
                "options": [
                  "Granting only the access needed.",
                  "Recording activity for review and audit.",
                  "Point where traffic crosses between different risk zones.",
                  "Rule list that permits or denies traffic."
                ],
                "correctIndex": 3,
                "explanation": "ACL matters in objective 4.1 because Rule list that permits or denies traffic. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-007",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A contractor should reach one ticketing app but no internal server subnets. Which security principle is most relevant?",
                "options": [
                  "Public DHCP for every server.",
                  "Disabling encryption to simplify access.",
                  "Least privilege enforced with authorization and segmentation.",
                  "Full mesh routing between all VLANs."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 4.1, Basic Network Security Concepts. Least privilege enforced with authorization and segmentation. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-008",
                "objective": "4.1",
                "domain": 4,
                "prompt": "Before changing production settings for Basic Network Security Concepts, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should check identity, authorization, segmentation, encryption, and trust boundaries.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 4.1: check identity, authorization, segmentation, encryption, and trust boundaries. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-009",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A help desk note says: \"A contractor should reach one ticketing app but no internal server subnets.\" What is the best interpretation?",
                "options": [
                  "Least privilege enforced with authorization and segmentation.",
                  "Full mesh routing between all VLANs.",
                  "Public DHCP for every server.",
                  "Disabling encryption to simplify access."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Basic Network Security Concepts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n41-basic-network-security-concepts-010",
                "objective": "4.1",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.1, Basic Network Security Concepts?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician check identity, authorization, segmentation, encryption, and trust boundaries."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Basic Network Security Concepts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n42-network-attacks-and-impacts-section",
        "title": "Section 4.2 - Network Attacks and Impacts",
        "summary": "Recognize DoS, ARP spoofing, DNS poisoning, rogue devices, VLAN hopping, and social engineering.",
        "activities": [
          {
            "id": "n42-network-attacks-and-impacts-lesson",
            "type": "lesson",
            "title": "Network Attacks and Impacts",
            "duration": 18,
            "required": true,
            "domain": 4,
            "objective": "4.2",
            "difficulty": "advanced",
            "summary": "Network attacks are often recognized by their impact: users cannot connect, traffic goes somewhere unexpected, credentials are exposed, or devices behave as if policy no longer applies. Network+ focuses on recognizing common attacks and selecting reasonable defensive evidence.",
            "learningObjectives": [
              "Identify common network attacks and their impact",
              "Explain how attacks affect availability, integrity, confidentiality, or control",
              "Choose evidence that distinguishes similar attacks"
            ],
            "headings": [
              "How attacks show up on networks",
              "Availability attacks",
              "Layer 2 and name attacks",
              "Rogue services and wireless attacks",
              "Evidence and impact",
              "Mastery target"
            ],
            "content": [
              "Network attacks are often recognized by their impact: users cannot connect, traffic goes somewhere unexpected, credentials are exposed, or devices behave as if policy no longer applies. Network+ focuses on recognizing common attacks and selecting reasonable defensive evidence.",
              "DoS and DDoS attacks try to exhaust capacity, state tables, CPU, memory, or application resources. Symptoms can include saturated links, high connection counts, failed legitimate sessions, or service instability. The fix usually involves filtering, rate limiting, upstream support, or architecture changes rather than rebooting clients.",
              "ARP spoofing tricks hosts into sending local traffic to the attacker. DNS poisoning or spoofing sends users to the wrong destination for a name. These attacks can enable interception, redirection, or outage. Evidence may include wrong MAC-to-IP mappings, unexpected DNS answers, or certificate warnings.",
              "A rogue DHCP server can hand out wrong gateways or DNS servers. A rogue AP can lure clients onto an unauthorized wireless network. VLAN hopping attempts to cross VLAN boundaries. Evil twin wireless attacks imitate a legitimate SSID to capture clients.",
              "Attack evidence includes switch security logs, DHCP snooping tables, ARP tables, DNS query results, wireless controller alerts, firewall logs, flow spikes, and packet captures. The right evidence depends on the layer and attack pattern.",
              "Mastery means you can name the likely attack from the symptom, describe the business impact, and choose a defensive control or investigation step that matches the attack."
            ]
          },
          {
            "id": "n42-network-attacks-and-impacts-scenario",
            "type": "scenario",
            "title": "Worked scenario - Network Attacks and Impacts",
            "duration": 10,
            "required": true,
            "domain": 4,
            "objective": "4.2",
            "difficulty": "advanced",
            "summary": "Apply network attacks and impacts to a realistic Network+ decision.",
            "evidence": [
              "Users are sent to a fake internal portal after resolving a familiar hostname.",
              "The objective evidence should let the technician compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs.",
              "The decision should preserve service while narrowing network attacks and impacts to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "DNS poisoning or spoofing that returns a malicious address.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Network Attacks and Impacts scenario is testing objective 4.2. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n42-network-attacks-and-impacts-cards",
            "type": "flashcards",
            "title": "Network Attacks and Impacts flashcards",
            "duration": 10,
            "required": true,
            "domain": 4,
            "objective": "4.2",
            "difficulty": "advanced",
            "summary": "Practice the terms needed for objective 4.2.",
            "cards": [
              [
                "DoS",
                "Attack that denies service from one source or method."
              ],
              [
                "DDoS",
                "Distributed attack that overwhelms service or capacity."
              ],
              [
                "ARP spoofing",
                "Forging ARP information to redirect local traffic."
              ],
              [
                "DNS poisoning",
                "Supplying false DNS answers."
              ],
              [
                "Rogue DHCP",
                "Unauthorized DHCP service giving clients bad settings."
              ],
              [
                "Rogue AP",
                "Unauthorized wireless access point."
              ],
              [
                "Evil twin",
                "Malicious AP imitating a legitimate wireless network."
              ],
              [
                "VLAN hopping",
                "Attempt to send traffic into an unauthorized VLAN."
              ],
              [
                "On-path attack",
                "Attacker positions between communicating parties."
              ],
              [
                "MAC flooding",
                "Overwhelming a switch MAC table to affect forwarding."
              ],
              [
                "Deauthentication attack",
                "Wireless attack forcing clients to disconnect."
              ],
              [
                "Impact",
                "Effect on confidentiality, integrity, availability, or control."
              ]
            ]
          },
          {
            "id": "n42-network-attacks-and-impacts-check",
            "type": "quiz",
            "title": "Network Attacks and Impacts coached check",
            "duration": 8,
            "required": true,
            "domain": 4,
            "objective": "4.2",
            "difficulty": "advanced",
            "summary": "Five coached questions for objective 4.2.",
            "questions": [
              {
                "id": "check-n42-network-attacks-and-impacts-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n42-network-attacks-and-impacts-002",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Users are sent to a fake internal portal after resolving a familiar hostname. Which attack pattern fits best?",
                "options": [
                  "A hot-site failover test.",
                  "A PoE budget shortage.",
                  "A normal route metric change.",
                  "DNS poisoning or spoofing that returns a malicious address."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 4.2, Network Attacks and Impacts. DNS poisoning or spoofing that returns a malicious address. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n42-network-attacks-and-impacts-003",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Before changing production settings for Network Attacks and Impacts, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 4.2: compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n42-network-attacks-and-impacts-004",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A help desk note says: \"Users are sent to a fake internal portal after resolving a familiar hostname.\" What is the best interpretation?",
                "options": [
                  "A normal route metric change.",
                  "DNS poisoning or spoofing that returns a malicious address.",
                  "A hot-site failover test.",
                  "A PoE budget shortage."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Attacks and Impacts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n42-network-attacks-and-impacts-005",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.2, Network Attacks and Impacts?",
                "options": [
                  "Evidence that lets the technician compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Attacks and Impacts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n42-network-attacks-and-impacts-quiz",
            "type": "quiz",
            "title": "Network Attacks and Impacts section quiz",
            "duration": 12,
            "required": true,
            "domain": 4,
            "objective": "4.2",
            "difficulty": "advanced",
            "summary": "Ten section quiz questions for objective 4.2.",
            "questions": [
              {
                "id": "quiz-n42-network-attacks-and-impacts-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches Impact?",
                "options": [
                  "Effect on confidentiality, integrity, availability, or control.",
                  "Overwhelming a switch MAC table to affect forwarding.",
                  "Attempt to send traffic into an unauthorized VLAN.",
                  "Unauthorized wireless access point."
                ],
                "correctIndex": 0,
                "explanation": "Impact matters in objective 4.2 because Effect on confidentiality, integrity, availability, or control. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-002",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Users are sent to a fake internal portal after resolving a familiar hostname. Which attack pattern fits best?",
                "options": [
                  "A hot-site failover test.",
                  "A PoE budget shortage.",
                  "A normal route metric change.",
                  "DNS poisoning or spoofing that returns a malicious address."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 4.2, Network Attacks and Impacts. DNS poisoning or spoofing that returns a malicious address. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-003",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Before changing production settings for Network Attacks and Impacts, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 4.2: compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-004",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A help desk note says: \"Users are sent to a fake internal portal after resolving a familiar hostname.\" What is the best interpretation?",
                "options": [
                  "A normal route metric change.",
                  "DNS poisoning or spoofing that returns a malicious address.",
                  "A hot-site failover test.",
                  "A PoE budget shortage."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Attacks and Impacts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-005",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.2, Network Attacks and Impacts?",
                "options": [
                  "Evidence that lets the technician compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Attacks and Impacts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-006",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches Evil twin?",
                "options": [
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Forging ARP information to redirect local traffic.",
                  "Attack that denies service from one source or method.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 3,
                "explanation": "Evil twin matters in objective 4.2 because Malicious AP imitating a legitimate wireless network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-007",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Users are sent to a fake internal portal after resolving a familiar hostname. Which attack pattern fits best?",
                "options": [
                  "A PoE budget shortage.",
                  "A normal route metric change.",
                  "DNS poisoning or spoofing that returns a malicious address.",
                  "A hot-site failover test."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 4.2, Network Attacks and Impacts. DNS poisoning or spoofing that returns a malicious address. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-008",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Before changing production settings for Network Attacks and Impacts, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 4.2: compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-009",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A help desk note says: \"Users are sent to a fake internal portal after resolving a familiar hostname.\" What is the best interpretation?",
                "options": [
                  "DNS poisoning or spoofing that returns a malicious address.",
                  "A hot-site failover test.",
                  "A PoE budget shortage.",
                  "A normal route metric change."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Attacks and Impacts, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n42-network-attacks-and-impacts-010",
                "objective": "4.2",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.2, Network Attacks and Impacts?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician compare ARP/DNS answers, rogue services, wireless alerts, flow spikes, and logs."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Attacks and Impacts, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n43-security-features-and-defense-techniques-section",
        "title": "Section 4.3 - Security Features and Defense Techniques",
        "summary": "Apply hardening, ACLs, secure protocols, NAC, DHCP snooping, DAI, IDS/IPS, and firewall rules.",
        "activities": [
          {
            "id": "n43-security-features-and-defense-techniques-lesson",
            "type": "lesson",
            "title": "Security Features and Defense Techniques",
            "duration": 18,
            "required": true,
            "domain": 4,
            "objective": "4.3",
            "difficulty": "advanced",
            "summary": "Network defense works best in layers. One control rarely solves every risk. Device hardening, secure management, ACLs, DHCP snooping, dynamic ARP inspection, port security, NAC, segmentation, and monitoring each reduce a different class of failure or attack.",
            "learningObjectives": [
              "Explain common network defense features",
              "Map controls to attacks and operational risks",
              "Choose hardening and enforcement evidence"
            ],
            "headings": [
              "Defense in layers",
              "Hardening devices",
              "Layer 2 protections",
              "Access enforcement",
              "Validation evidence",
              "Mastery target"
            ],
            "content": [
              "Network defense works best in layers. One control rarely solves every risk. Device hardening, secure management, ACLs, DHCP snooping, dynamic ARP inspection, port security, NAC, segmentation, and monitoring each reduce a different class of failure or attack.",
              "Device hardening includes changing defaults, disabling unused services, using secure protocols, applying updates, restricting management access, backing up configurations, and logging administrative activity. Management interfaces should not be exposed to ordinary user networks or the public internet.",
              "Layer 2 protections stop local network abuse. DHCP snooping marks trusted ports and records legitimate DHCP bindings. Dynamic ARP inspection uses that binding information to block forged ARP. Port security can restrict the number or identity of MAC addresses on a switch port.",
              "ACLs and firewall rules enforce which traffic is allowed between networks. NAC and 802.1X can require identity or device posture before granting access. Captive portals may be appropriate for guest access, but they are not the same as strong internal authentication.",
              "Validation evidence includes running configuration, management ACLs, firmware version, disabled services list, DHCP snooping table, ARP inspection logs, NAC authentication result, and firewall hit counters. A control should be verified against the risk it is supposed to reduce.",
              "Mastery means you can match a defense feature to a specific risk and explain the tradeoff: stronger control, better visibility, possible user friction, and operational maintenance."
            ]
          },
          {
            "id": "n43-security-features-and-defense-techniques-scenario",
            "type": "scenario",
            "title": "Worked scenario - Security Features and Defense Techniques",
            "duration": 10,
            "required": true,
            "domain": 4,
            "objective": "4.3",
            "difficulty": "advanced",
            "summary": "Apply security features and defense techniques to a realistic Network+ decision.",
            "evidence": [
              "An attacker connects a rogue DHCP server to an office jack.",
              "The objective evidence should let the technician confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions.",
              "The decision should preserve service while narrowing security features and defense techniques to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "DHCP snooping with trusted ports defined on the switch.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Security Features and Defense Techniques scenario is testing objective 4.3. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n43-security-features-and-defense-techniques-cards",
            "type": "flashcards",
            "title": "Security Features and Defense Techniques flashcards",
            "duration": 10,
            "required": true,
            "domain": 4,
            "objective": "4.3",
            "difficulty": "advanced",
            "summary": "Practice the terms needed for objective 4.3.",
            "cards": [
              [
                "Device hardening",
                "Reducing device attack surface and insecure defaults."
              ],
              [
                "Secure management",
                "Using protected protocols and restricted admin access."
              ],
              [
                "ACL",
                "Traffic permit or deny rules."
              ],
              [
                "DHCP snooping",
                "Switch feature that blocks untrusted DHCP replies."
              ],
              [
                "Dynamic ARP inspection",
                "Blocks forged ARP using trusted binding data."
              ],
              [
                "Port security",
                "Limits MAC behavior on switch ports."
              ],
              [
                "802.1X",
                "Port-based network authentication."
              ],
              [
                "NAC",
                "Network access control using identity or posture."
              ],
              [
                "Captive portal",
                "Web-based acceptance or login page for network access."
              ],
              [
                "Firmware update",
                "Patch that can fix bugs and security issues."
              ],
              [
                "Management ACL",
                "Restriction on who can administer devices."
              ],
              [
                "Firewall hit counter",
                "Evidence that a firewall rule is matching traffic."
              ]
            ]
          },
          {
            "id": "n43-security-features-and-defense-techniques-check",
            "type": "quiz",
            "title": "Security Features and Defense Techniques coached check",
            "duration": 8,
            "required": true,
            "domain": 4,
            "objective": "4.3",
            "difficulty": "advanced",
            "summary": "Five coached questions for objective 4.3.",
            "questions": [
              {
                "id": "check-n43-security-features-and-defense-techniques-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n43-security-features-and-defense-techniques-002",
                "objective": "4.3",
                "domain": 4,
                "prompt": "An attacker connects a rogue DHCP server to an office jack. Which defense directly reduces this risk?",
                "options": [
                  "Increasing DNS TTL values.",
                  "Replacing dynamic routing with APIPA.",
                  "Turning off all switch logging.",
                  "DHCP snooping with trusted ports defined on the switch."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 4.3, Security Features and Defense Techniques. DHCP snooping with trusted ports defined on the switch. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n43-security-features-and-defense-techniques-003",
                "objective": "4.3",
                "domain": 4,
                "prompt": "Before changing production settings for Security Features and Defense Techniques, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 4.3: confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n43-security-features-and-defense-techniques-004",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A help desk note says: \"An attacker connects a rogue DHCP server to an office jack.\" What is the best interpretation?",
                "options": [
                  "Turning off all switch logging.",
                  "DHCP snooping with trusted ports defined on the switch.",
                  "Increasing DNS TTL values.",
                  "Replacing dynamic routing with APIPA."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Security Features and Defense Techniques, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n43-security-features-and-defense-techniques-005",
                "objective": "4.3",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.3, Security Features and Defense Techniques?",
                "options": [
                  "Evidence that lets the technician confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Security Features and Defense Techniques, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n43-security-features-and-defense-techniques-quiz",
            "type": "quiz",
            "title": "Security Features and Defense Techniques section quiz",
            "duration": 12,
            "required": true,
            "domain": 4,
            "objective": "4.3",
            "difficulty": "advanced",
            "summary": "Ten section quiz questions for objective 4.3.",
            "questions": [
              {
                "id": "quiz-n43-security-features-and-defense-techniques-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Firewall hit counter?",
                "options": [
                  "Evidence that a firewall rule is matching traffic.",
                  "Patch that can fix bugs and security issues.",
                  "Network access control using identity or posture.",
                  "Limits MAC behavior on switch ports."
                ],
                "correctIndex": 0,
                "explanation": "Firewall hit counter matters in objective 4.3 because Evidence that a firewall rule is matching traffic. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-002",
                "objective": "4.3",
                "domain": 4,
                "prompt": "An attacker connects a rogue DHCP server to an office jack. Which defense directly reduces this risk?",
                "options": [
                  "Increasing DNS TTL values.",
                  "Replacing dynamic routing with APIPA.",
                  "Turning off all switch logging.",
                  "DHCP snooping with trusted ports defined on the switch."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 4.3, Security Features and Defense Techniques. DHCP snooping with trusted ports defined on the switch. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-003",
                "objective": "4.3",
                "domain": 4,
                "prompt": "Before changing production settings for Security Features and Defense Techniques, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 4.3: confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-004",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A help desk note says: \"An attacker connects a rogue DHCP server to an office jack.\" What is the best interpretation?",
                "options": [
                  "Turning off all switch logging.",
                  "DHCP snooping with trusted ports defined on the switch.",
                  "Increasing DNS TTL values.",
                  "Replacing dynamic routing with APIPA."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Security Features and Defense Techniques, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-005",
                "objective": "4.3",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.3, Security Features and Defense Techniques?",
                "options": [
                  "Evidence that lets the technician confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Security Features and Defense Techniques, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-006",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches 802.1X?",
                "options": [
                  "Blocks forged ARP using trusted binding data.",
                  "Traffic permit or deny rules.",
                  "Reducing device attack surface and insecure defaults.",
                  "Port-based network authentication."
                ],
                "correctIndex": 3,
                "explanation": "802.1X matters in objective 4.3 because Port-based network authentication. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-007",
                "objective": "4.3",
                "domain": 4,
                "prompt": "An attacker connects a rogue DHCP server to an office jack. Which defense directly reduces this risk?",
                "options": [
                  "Replacing dynamic routing with APIPA.",
                  "Turning off all switch logging.",
                  "DHCP snooping with trusted ports defined on the switch.",
                  "Increasing DNS TTL values."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 4.3, Security Features and Defense Techniques. DHCP snooping with trusted ports defined on the switch. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-008",
                "objective": "4.3",
                "domain": 4,
                "prompt": "Before changing production settings for Security Features and Defense Techniques, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 4.3: confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-009",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A help desk note says: \"An attacker connects a rogue DHCP server to an office jack.\" What is the best interpretation?",
                "options": [
                  "DHCP snooping with trusted ports defined on the switch.",
                  "Increasing DNS TTL values.",
                  "Replacing dynamic routing with APIPA.",
                  "Turning off all switch logging."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Security Features and Defense Techniques, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n43-security-features-and-defense-techniques-010",
                "objective": "4.3",
                "domain": 4,
                "prompt": "Which evidence would most improve confidence when working through objective 4.3, Security Features and Defense Techniques?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician confirm hardening, ACLs, DHCP snooping, ARP inspection, NAC, and management restrictions."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Security Features and Defense Techniques, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "t4-final-section",
        "title": "Tier 4 final checkpoint",
        "summary": "Mixed review for Network Security.",
        "activities": [
          {
            "id": "t4-checkpoint",
            "type": "checkpoint",
            "title": "Tier 4 cumulative checkpoint",
            "duration": 25,
            "required": true,
            "domain": 4,
            "objective": "Tier 4 synthesis",
            "difficulty": "advanced",
            "summary": "Twenty mixed questions covering Network Security.",
            "questions": [
              {
                "id": "checkpoint-tier-4-001-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-002-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-003-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-004-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-005-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-006-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-007-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-008-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-009-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-010-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-011-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-012-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-013-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-014-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-015-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-016-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-017-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-018-001",
                "objective": "4.3",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-019-001",
                "objective": "4.1",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-4-020-001",
                "objective": "4.2",
                "domain": 4,
                "prompt": "A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tier-5",
    "number": 5,
    "title": "Network Troubleshooting",
    "subtitle": "Go from zero to fluent in network troubleshooting.",
    "difficulty": "synthesis",
    "color": "#35f0a0",
    "minutes": 285,
    "recommendedAfter": 4,
    "modules": [
      {
        "id": "n51-troubleshooting-methodology-section",
        "title": "Section 5.1 - Troubleshooting Methodology",
        "summary": "Follow the CompTIA troubleshooting process from identifying the problem through documentation.",
        "activities": [
          {
            "id": "n51-troubleshooting-methodology-lesson",
            "type": "lesson",
            "title": "Troubleshooting Methodology",
            "duration": 18,
            "required": true,
            "domain": 5,
            "objective": "5.1",
            "difficulty": "synthesis",
            "summary": "Troubleshooting is structured thinking under uncertainty. The Network+ method prevents random changes by forcing you to identify the problem, gather information, establish a theory, test it, plan the fix, implement it, verify functionality, and document the result.",
            "learningObjectives": [
              "Apply the Network+ troubleshooting methodology",
              "Move from symptoms to theories to verified fixes",
              "Document findings and avoid broad unproven changes"
            ],
            "headings": [
              "Troubleshooting is a process",
              "Identify and scope the problem",
              "Build and test a theory",
              "Plan, implement, and verify",
              "Document and learn",
              "Mastery target"
            ],
            "content": [
              "Troubleshooting is structured thinking under uncertainty. The Network+ method prevents random changes by forcing you to identify the problem, gather information, establish a theory, test it, plan the fix, implement it, verify functionality, and document the result.",
              "Start by identifying who is affected, what changed, when it began, which services fail, which still work, and what the expected behavior is. Scope matters: one user, one VLAN, one floor, one site, or everyone points to different likely causes.",
              "A theory should explain the evidence. If the theory predicts that clients in one VLAN have no default gateway, check IP settings and gateway reachability. If the evidence disproves the theory, form another one. Escalation is appropriate when the next step exceeds authority, access, time, or skill.",
              "Before implementing a fix, consider impact, approval, rollback, maintenance windows, and communication. Change one meaningful thing at a time when possible. After the fix, verify not only that the reported symptom is gone, but that normal service is restored.",
              "Documentation preserves what was learned: symptoms, affected scope, root cause, change made, commands used, verification, and prevention. Good documentation makes the next incident shorter.",
              "Mastery means you can choose the next best troubleshooting step in a scenario and explain why it follows the method instead of jumping to a familiar but unsupported fix."
            ]
          },
          {
            "id": "n51-troubleshooting-methodology-scenario",
            "type": "scenario",
            "title": "Worked scenario - Troubleshooting Methodology",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.1",
            "difficulty": "synthesis",
            "summary": "Apply troubleshooting methodology to a realistic Network+ decision.",
            "evidence": [
              "A technician has a theory but has not tested it or checked impact.",
              "The objective evidence should let the technician follow identify, theorize, test, plan, implement, verify, and document steps.",
              "The decision should preserve service while narrowing troubleshooting methodology to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Test the theory and plan the change, including impact and rollback.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician follow identify, theorize, test, plan, implement, verify, and document steps.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Troubleshooting Methodology scenario is testing objective 5.1. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n51-troubleshooting-methodology-cards",
            "type": "flashcards",
            "title": "Troubleshooting Methodology flashcards",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.1",
            "difficulty": "synthesis",
            "summary": "Practice the terms needed for objective 5.1.",
            "cards": [
              [
                "Identify the problem",
                "Gather symptoms, scope, users, changes, and expected behavior."
              ],
              [
                "Establish a theory",
                "Create a likely explanation that fits the evidence."
              ],
              [
                "Test the theory",
                "Use evidence to confirm or reject the explanation."
              ],
              [
                "Escalate",
                "Involve appropriate resources when needed."
              ],
              [
                "Plan of action",
                "Fix plan that considers impact and rollback."
              ],
              [
                "Implement solution",
                "Apply the approved corrective action."
              ],
              [
                "Verify functionality",
                "Confirm the service works and no new issues appeared."
              ],
              [
                "Document findings",
                "Record cause, fix, verification, and lessons learned."
              ],
              [
                "Scope",
                "Who or what is affected."
              ],
              [
                "Root cause",
                "Underlying reason the issue happened."
              ],
              [
                "Rollback",
                "Returning to the previous known state."
              ],
              [
                "Change control",
                "Approval process for production changes."
              ]
            ]
          },
          {
            "id": "n51-troubleshooting-methodology-check",
            "type": "quiz",
            "title": "Troubleshooting Methodology coached check",
            "duration": 8,
            "required": true,
            "domain": 5,
            "objective": "5.1",
            "difficulty": "synthesis",
            "summary": "Five coached questions for objective 5.1.",
            "questions": [
              {
                "id": "check-n51-troubleshooting-methodology-001",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n51-troubleshooting-methodology-002",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A technician has a theory but has not tested it or checked impact. What should happen before implementing a fix?",
                "options": [
                  "Change several settings at once to save time.",
                  "Mark the incident resolved before verifying the original symptom.",
                  "Ignore documentation until the next outage.",
                  "Test the theory and plan the change, including impact and rollback."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.1, Troubleshooting Methodology. Test the theory and plan the change, including impact and rollback. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n51-troubleshooting-methodology-003",
                "objective": "5.1",
                "domain": 5,
                "prompt": "Before changing production settings for Troubleshooting Methodology, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should follow identify, theorize, test, plan, implement, verify, and document steps.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.1: follow identify, theorize, test, plan, implement, verify, and document steps. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n51-troubleshooting-methodology-004",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A help desk note says: \"A technician has a theory but has not tested it or checked impact.\" What is the best interpretation?",
                "options": [
                  "Ignore documentation until the next outage.",
                  "Test the theory and plan the change, including impact and rollback.",
                  "Change several settings at once to save time.",
                  "Mark the incident resolved before verifying the original symptom."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Troubleshooting Methodology, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n51-troubleshooting-methodology-005",
                "objective": "5.1",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.1, Troubleshooting Methodology?",
                "options": [
                  "Evidence that lets the technician follow identify, theorize, test, plan, implement, verify, and document steps.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Troubleshooting Methodology, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n51-troubleshooting-methodology-quiz",
            "type": "quiz",
            "title": "Troubleshooting Methodology section quiz",
            "duration": 12,
            "required": true,
            "domain": 5,
            "objective": "5.1",
            "difficulty": "synthesis",
            "summary": "Ten section quiz questions for objective 5.1.",
            "questions": [
              {
                "id": "quiz-n51-troubleshooting-methodology-001",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Change control?",
                "options": [
                  "Approval process for production changes.",
                  "Underlying reason the issue happened.",
                  "Record cause, fix, verification, and lessons learned.",
                  "Apply the approved corrective action."
                ],
                "correctIndex": 0,
                "explanation": "Change control matters in objective 5.1 because Approval process for production changes. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-002",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A technician has a theory but has not tested it or checked impact. What should happen before implementing a fix?",
                "options": [
                  "Change several settings at once to save time.",
                  "Mark the incident resolved before verifying the original symptom.",
                  "Ignore documentation until the next outage.",
                  "Test the theory and plan the change, including impact and rollback."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.1, Troubleshooting Methodology. Test the theory and plan the change, including impact and rollback. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-003",
                "objective": "5.1",
                "domain": 5,
                "prompt": "Before changing production settings for Troubleshooting Methodology, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should follow identify, theorize, test, plan, implement, verify, and document steps.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.1: follow identify, theorize, test, plan, implement, verify, and document steps. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-004",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A help desk note says: \"A technician has a theory but has not tested it or checked impact.\" What is the best interpretation?",
                "options": [
                  "Ignore documentation until the next outage.",
                  "Test the theory and plan the change, including impact and rollback.",
                  "Change several settings at once to save time.",
                  "Mark the incident resolved before verifying the original symptom."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Troubleshooting Methodology, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-005",
                "objective": "5.1",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.1, Troubleshooting Methodology?",
                "options": [
                  "Evidence that lets the technician follow identify, theorize, test, plan, implement, verify, and document steps.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Troubleshooting Methodology, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-006",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Verify functionality?",
                "options": [
                  "Fix plan that considers impact and rollback.",
                  "Use evidence to confirm or reject the explanation.",
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 3,
                "explanation": "Verify functionality matters in objective 5.1 because Confirm the service works and no new issues appeared. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-007",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A technician has a theory but has not tested it or checked impact. What should happen before implementing a fix?",
                "options": [
                  "Mark the incident resolved before verifying the original symptom.",
                  "Ignore documentation until the next outage.",
                  "Test the theory and plan the change, including impact and rollback.",
                  "Change several settings at once to save time."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 5.1, Troubleshooting Methodology. Test the theory and plan the change, including impact and rollback. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-008",
                "objective": "5.1",
                "domain": 5,
                "prompt": "Before changing production settings for Troubleshooting Methodology, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should follow identify, theorize, test, plan, implement, verify, and document steps.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 5.1: follow identify, theorize, test, plan, implement, verify, and document steps. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-009",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A help desk note says: \"A technician has a theory but has not tested it or checked impact.\" What is the best interpretation?",
                "options": [
                  "Test the theory and plan the change, including impact and rollback.",
                  "Change several settings at once to save time.",
                  "Mark the incident resolved before verifying the original symptom.",
                  "Ignore documentation until the next outage."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Troubleshooting Methodology, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n51-troubleshooting-methodology-010",
                "objective": "5.1",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.1, Troubleshooting Methodology?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician follow identify, theorize, test, plan, implement, verify, and document steps."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Troubleshooting Methodology, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n52-cabling-and-physical-interface-issues-section",
        "title": "Section 5.2 - Cabling and Physical Interface Issues",
        "summary": "Troubleshoot cable type, fiber mismatch, transceiver issues, PoE, speed/duplex, and counters.",
        "activities": [
          {
            "id": "n52-cabling-and-physical-interface-issues-lesson",
            "type": "lesson",
            "title": "Cabling and Physical Interface Issues",
            "duration": 18,
            "required": true,
            "domain": 5,
            "objective": "5.2",
            "difficulty": "synthesis",
            "summary": "Cabling and physical interface issues live mostly at Layer 1 and Layer 2, but users report them as slow apps, dropped calls, or no network. A technician must check physical evidence early because software changes will not fix a damaged cable or wrong optic.",
            "learningObjectives": [
              "Recognize physical and cabling symptoms",
              "Explain copper, fiber, transceiver, PoE, and duplex problems",
              "Choose physical-layer tests before logical changes"
            ],
            "headings": [
              "Physical issues masquerade as network issues",
              "Copper and fiber problems",
              "Interfaces, duplex, and errors",
              "PoE and transceivers",
              "Testing evidence",
              "Mastery target"
            ],
            "content": [
              "Cabling and physical interface issues live mostly at Layer 1 and Layer 2, but users report them as slow apps, dropped calls, or no network. A technician must check physical evidence early because software changes will not fix a damaged cable or wrong optic.",
              "Copper problems include wrong cable category, excessive length, bad termination, split pairs, damaged jackets, EMI, loose connectors, and patching mistakes. Fiber problems include dirty connectors, wrong fiber mode, wrong wavelength, damaged strands, excessive bend, and light levels outside tolerance.",
              "Interface problems include speed and duplex mismatch, administratively disabled ports, err-disabled ports, high CRC errors, runts, giants, drops, and flapping links. Auto-negotiation usually works, but mismatched manual settings can create hard-to-read performance issues.",
              "PoE problems happen when devices need more power than a switch or port can provide, when the wrong PoE standard is used, or when cable quality causes power delivery trouble. Transceiver problems happen when speed, media type, wavelength, or vendor compatibility does not match.",
              "Evidence includes link light, interface status, cable tester, certifier, tone generator, loopback plug, OTDR, optical power meter, switch counters, PoE status, and transceiver diagnostics. The best first step depends on whether the symptom is no link, intermittent link, errors, or insufficient power.",
              "Mastery means you can read physical clues and pick the test that proves whether the cable, connector, optic, interface setting, or power budget is the cause."
            ]
          },
          {
            "id": "n52-cabling-and-physical-interface-issues-scenario",
            "type": "scenario",
            "title": "Worked scenario - Cabling and Physical Interface Issues",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.2",
            "difficulty": "synthesis",
            "summary": "Apply cabling and physical interface issues to a realistic Network+ decision.",
            "evidence": [
              "A switch port shows frequent CRC errors and link flaps after a desk move.",
              "The objective evidence should let the technician test cabling, interface status, transceiver, PoE, counters, and fiber light levels.",
              "The decision should preserve service while narrowing cabling and physical interface issues to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Cable, connector, termination, patch path, speed/duplex, or physical damage.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician test cabling, interface status, transceiver, PoE, counters, and fiber light levels.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Cabling and Physical Interface Issues scenario is testing objective 5.2. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n52-cabling-and-physical-interface-issues-cards",
            "type": "flashcards",
            "title": "Cabling and Physical Interface Issues flashcards",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.2",
            "difficulty": "synthesis",
            "summary": "Practice the terms needed for objective 5.2.",
            "cards": [
              [
                "CRC error",
                "Frame check error often associated with physical problems."
              ],
              [
                "Runts",
                "Frames smaller than expected minimum size."
              ],
              [
                "Giants",
                "Frames larger than expected maximum size."
              ],
              [
                "Duplex mismatch",
                "Two ends disagree about full or half duplex behavior."
              ],
              [
                "Link flap",
                "Interface repeatedly goes up and down."
              ],
              [
                "Cable tester",
                "Tool for wire map and basic cable fault testing."
              ],
              [
                "Cable certifier",
                "Tool that validates cabling meets a standard."
              ],
              [
                "OTDR",
                "Fiber tool that locates faults and measures reflections."
              ],
              [
                "Optical power meter",
                "Measures fiber light level."
              ],
              [
                "PoE budget",
                "Available switch power for powered devices."
              ],
              [
                "Transceiver mismatch",
                "Optic or module does not match media, speed, or wavelength."
              ],
              [
                "EMI",
                "Interference that can disrupt copper signaling."
              ]
            ]
          },
          {
            "id": "n52-cabling-and-physical-interface-issues-check",
            "type": "quiz",
            "title": "Cabling and Physical Interface Issues coached check",
            "duration": 8,
            "required": true,
            "domain": 5,
            "objective": "5.2",
            "difficulty": "synthesis",
            "summary": "Five coached questions for objective 5.2.",
            "questions": [
              {
                "id": "check-n52-cabling-and-physical-interface-issues-001",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n52-cabling-and-physical-interface-issues-002",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A switch port shows frequent CRC errors and link flaps after a desk move. Which cause should be checked early?",
                "options": [
                  "The MX record priority.",
                  "The cloud security group description.",
                  "The RTO value in the DR plan.",
                  "Cable, connector, termination, patch path, speed/duplex, or physical damage."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.2, Cabling and Physical Interface Issues. Cable, connector, termination, patch path, speed/duplex, or physical damage. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n52-cabling-and-physical-interface-issues-003",
                "objective": "5.2",
                "domain": 5,
                "prompt": "Before changing production settings for Cabling and Physical Interface Issues, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should test cabling, interface status, transceiver, PoE, counters, and fiber light levels.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.2: test cabling, interface status, transceiver, PoE, counters, and fiber light levels. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n52-cabling-and-physical-interface-issues-004",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A help desk note says: \"A switch port shows frequent CRC errors and link flaps after a desk move.\" What is the best interpretation?",
                "options": [
                  "The RTO value in the DR plan.",
                  "Cable, connector, termination, patch path, speed/duplex, or physical damage.",
                  "The MX record priority.",
                  "The cloud security group description."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Cabling and Physical Interface Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n52-cabling-and-physical-interface-issues-005",
                "objective": "5.2",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.2, Cabling and Physical Interface Issues?",
                "options": [
                  "Evidence that lets the technician test cabling, interface status, transceiver, PoE, counters, and fiber light levels.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Cabling and Physical Interface Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n52-cabling-and-physical-interface-issues-quiz",
            "type": "quiz",
            "title": "Cabling and Physical Interface Issues section quiz",
            "duration": 12,
            "required": true,
            "domain": 5,
            "objective": "5.2",
            "difficulty": "synthesis",
            "summary": "Ten section quiz questions for objective 5.2.",
            "questions": [
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-001",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches EMI?",
                "options": [
                  "Interference that can disrupt copper signaling.",
                  "Available switch power for powered devices.",
                  "Fiber tool that locates faults and measures reflections.",
                  "Tool for wire map and basic cable fault testing."
                ],
                "correctIndex": 0,
                "explanation": "EMI matters in objective 5.2 because Interference that can disrupt copper signaling. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-002",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A switch port shows frequent CRC errors and link flaps after a desk move. Which cause should be checked early?",
                "options": [
                  "The MX record priority.",
                  "The cloud security group description.",
                  "The RTO value in the DR plan.",
                  "Cable, connector, termination, patch path, speed/duplex, or physical damage."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.2, Cabling and Physical Interface Issues. Cable, connector, termination, patch path, speed/duplex, or physical damage. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-003",
                "objective": "5.2",
                "domain": 5,
                "prompt": "Before changing production settings for Cabling and Physical Interface Issues, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should test cabling, interface status, transceiver, PoE, counters, and fiber light levels.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.2: test cabling, interface status, transceiver, PoE, counters, and fiber light levels. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-004",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A help desk note says: \"A switch port shows frequent CRC errors and link flaps after a desk move.\" What is the best interpretation?",
                "options": [
                  "The RTO value in the DR plan.",
                  "Cable, connector, termination, patch path, speed/duplex, or physical damage.",
                  "The MX record priority.",
                  "The cloud security group description."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Cabling and Physical Interface Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-005",
                "objective": "5.2",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.2, Cabling and Physical Interface Issues?",
                "options": [
                  "Evidence that lets the technician test cabling, interface status, transceiver, PoE, counters, and fiber light levels.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Cabling and Physical Interface Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-006",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches Cable certifier?",
                "options": [
                  "Interface repeatedly goes up and down.",
                  "Frames larger than expected maximum size.",
                  "Frame check error often associated with physical problems.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 3,
                "explanation": "Cable certifier matters in objective 5.2 because Tool that validates cabling meets a standard. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-007",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A switch port shows frequent CRC errors and link flaps after a desk move. Which cause should be checked early?",
                "options": [
                  "The cloud security group description.",
                  "The RTO value in the DR plan.",
                  "Cable, connector, termination, patch path, speed/duplex, or physical damage.",
                  "The MX record priority."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 5.2, Cabling and Physical Interface Issues. Cable, connector, termination, patch path, speed/duplex, or physical damage. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-008",
                "objective": "5.2",
                "domain": 5,
                "prompt": "Before changing production settings for Cabling and Physical Interface Issues, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should test cabling, interface status, transceiver, PoE, counters, and fiber light levels.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 5.2: test cabling, interface status, transceiver, PoE, counters, and fiber light levels. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-009",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A help desk note says: \"A switch port shows frequent CRC errors and link flaps after a desk move.\" What is the best interpretation?",
                "options": [
                  "Cable, connector, termination, patch path, speed/duplex, or physical damage.",
                  "The MX record priority.",
                  "The cloud security group description.",
                  "The RTO value in the DR plan."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Cabling and Physical Interface Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n52-cabling-and-physical-interface-issues-010",
                "objective": "5.2",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.2, Cabling and Physical Interface Issues?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician test cabling, interface status, transceiver, PoE, counters, and fiber light levels."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Cabling and Physical Interface Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n53-network-service-issues-section",
        "title": "Section 5.3 - Network Service Issues",
        "summary": "Troubleshoot DHCP, DNS, NTP, switching, routing, ACLs, gateways, and firewall behavior.",
        "activities": [
          {
            "id": "n53-network-service-issues-lesson",
            "type": "lesson",
            "title": "Network Service Issues",
            "duration": 18,
            "required": true,
            "domain": 5,
            "objective": "5.3",
            "difficulty": "synthesis",
            "summary": "Network service issues often appear above the physical layer. The link is up, but the client has no useful address, cannot resolve names, reaches some networks but not others, or is blocked by policy. The key is to identify which service in the path is responsible.",
            "learningObjectives": [
              "Diagnose common network service failures",
              "Differentiate DHCP, DNS, routing, VLAN, firewall, and certificate symptoms",
              "Use service evidence to avoid replacing healthy infrastructure"
            ],
            "headings": [
              "Services fail in patterns",
              "DHCP and addressing symptoms",
              "DNS and application reachability",
              "Routing, VLANs, and firewalls",
              "Evidence-driven repair",
              "Mastery target"
            ],
            "content": [
              "Network service issues often appear above the physical layer. The link is up, but the client has no useful address, cannot resolve names, reaches some networks but not others, or is blocked by policy. The key is to identify which service in the path is responsible.",
              "DHCP failures can produce APIPA addresses, wrong gateways, duplicate addresses, exhausted scopes, incorrect options, or clients stuck with stale leases. DHCP relay problems often affect one VLAN while other VLANs still work.",
              "DNS issues include wrong records, stale cache, unreachable resolver, bad search suffix, missing reverse record, or split-horizon confusion. If a user can reach a service by IP address but not by name, DNS becomes the leading theory.",
              "Routing and VLAN issues affect reachability by scope. A wrong VLAN places the host in the wrong network. A missing route breaks remote destinations. A firewall or ACL can allow ping but block the application port, or allow one subnet while denying another.",
              "Evidence includes client IP settings, DHCP server scope status, DNS query output, route table, ARP table, VLAN assignment, trunk allowed list, firewall logs, certificate validation, and service status. The right fix targets the service that failed, not every device in the path.",
              "Mastery means you can translate a user symptom into a likely service failure and pick the fastest proof: IP config for DHCP, lookup for DNS, route/traceroute for routing, switch port for VLAN, and logs for firewall policy."
            ]
          },
          {
            "id": "n53-network-service-issues-scenario",
            "type": "scenario",
            "title": "Worked scenario - Network Service Issues",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.3",
            "difficulty": "synthesis",
            "summary": "Apply network service issues to a realistic Network+ decision.",
            "evidence": [
              "A user can ping a server by IP address but cannot open it by name.",
              "The objective evidence should let the technician separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence.",
              "The decision should preserve service while narrowing network service issues to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "DNS resolution, cache, records, or resolver configuration.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Network Service Issues scenario is testing objective 5.3. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n53-network-service-issues-cards",
            "type": "flashcards",
            "title": "Network Service Issues flashcards",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.3",
            "difficulty": "synthesis",
            "summary": "Practice the terms needed for objective 5.3.",
            "cards": [
              [
                "APIPA",
                "169.254.0.0/16 address often indicating DHCP failure."
              ],
              [
                "DHCP exhaustion",
                "No available addresses remain in the scope."
              ],
              [
                "Duplicate IP",
                "Two devices use the same IP address."
              ],
              [
                "DNS resolver",
                "Server a client asks for name resolution."
              ],
              [
                "Stale DNS cache",
                "Old cached answer causing incorrect resolution."
              ],
              [
                "Wrong VLAN",
                "Endpoint placed in an unintended broadcast domain."
              ],
              [
                "Missing route",
                "No route exists to a destination network."
              ],
              [
                "Firewall block",
                "Policy denies desired traffic."
              ],
              [
                "ACL",
                "Ordered rules permitting or denying traffic."
              ],
              [
                "Certificate error",
                "Trust, name, expiration, or chain problem affecting secure services."
              ],
              [
                "Service status",
                "Whether the required server or daemon is running."
              ],
              [
                "Split DNS",
                "Different DNS answers depending on client location or view."
              ]
            ]
          },
          {
            "id": "n53-network-service-issues-check",
            "type": "quiz",
            "title": "Network Service Issues coached check",
            "duration": 8,
            "required": true,
            "domain": 5,
            "objective": "5.3",
            "difficulty": "synthesis",
            "summary": "Five coached questions for objective 5.3.",
            "questions": [
              {
                "id": "check-n53-network-service-issues-001",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n53-network-service-issues-002",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A user can ping a server by IP address but cannot open it by name. Which service is the leading suspect?",
                "options": [
                  "A broken copper pair because IP ping works.",
                  "A missing hot site because one name fails.",
                  "A wireless channel issue on the server.",
                  "DNS resolution, cache, records, or resolver configuration."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.3, Network Service Issues. DNS resolution, cache, records, or resolver configuration. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n53-network-service-issues-003",
                "objective": "5.3",
                "domain": 5,
                "prompt": "Before changing production settings for Network Service Issues, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.3: separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n53-network-service-issues-004",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A help desk note says: \"A user can ping a server by IP address but cannot open it by name.\" What is the best interpretation?",
                "options": [
                  "A wireless channel issue on the server.",
                  "DNS resolution, cache, records, or resolver configuration.",
                  "A broken copper pair because IP ping works.",
                  "A missing hot site because one name fails."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Service Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n53-network-service-issues-005",
                "objective": "5.3",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.3, Network Service Issues?",
                "options": [
                  "Evidence that lets the technician separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Service Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n53-network-service-issues-quiz",
            "type": "quiz",
            "title": "Network Service Issues section quiz",
            "duration": 12,
            "required": true,
            "domain": 5,
            "objective": "5.3",
            "difficulty": "synthesis",
            "summary": "Ten section quiz questions for objective 5.3.",
            "questions": [
              {
                "id": "quiz-n53-network-service-issues-001",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Network Service Issues. Which description correctly matches Split DNS?",
                "options": [
                  "Different DNS answers depending on client location or view.",
                  "Trust, name, expiration, or chain problem affecting secure services.",
                  "Policy denies desired traffic.",
                  "Endpoint placed in an unintended broadcast domain."
                ],
                "correctIndex": 0,
                "explanation": "Split DNS matters in objective 5.3 because Different DNS answers depending on client location or view. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-002",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A user can ping a server by IP address but cannot open it by name. Which service is the leading suspect?",
                "options": [
                  "A broken copper pair because IP ping works.",
                  "A missing hot site because one name fails.",
                  "A wireless channel issue on the server.",
                  "DNS resolution, cache, records, or resolver configuration."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.3, Network Service Issues. DNS resolution, cache, records, or resolver configuration. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-003",
                "objective": "5.3",
                "domain": 5,
                "prompt": "Before changing production settings for Network Service Issues, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.3: separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-004",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A help desk note says: \"A user can ping a server by IP address but cannot open it by name.\" What is the best interpretation?",
                "options": [
                  "A wireless channel issue on the server.",
                  "DNS resolution, cache, records, or resolver configuration.",
                  "A broken copper pair because IP ping works.",
                  "A missing hot site because one name fails."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Service Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-005",
                "objective": "5.3",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.3, Network Service Issues?",
                "options": [
                  "Evidence that lets the technician separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Service Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-006",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Network Service Issues. Which description correctly matches Missing route?",
                "options": [
                  "Old cached answer causing incorrect resolution.",
                  "Two devices use the same IP address.",
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 3,
                "explanation": "Missing route matters in objective 5.3 because No route exists to a destination network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-007",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A user can ping a server by IP address but cannot open it by name. Which service is the leading suspect?",
                "options": [
                  "A missing hot site because one name fails.",
                  "A wireless channel issue on the server.",
                  "DNS resolution, cache, records, or resolver configuration.",
                  "A broken copper pair because IP ping works."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 5.3, Network Service Issues. DNS resolution, cache, records, or resolver configuration. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-008",
                "objective": "5.3",
                "domain": 5,
                "prompt": "Before changing production settings for Network Service Issues, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 5.3: separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-009",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A help desk note says: \"A user can ping a server by IP address but cannot open it by name.\" What is the best interpretation?",
                "options": [
                  "DNS resolution, cache, records, or resolver configuration.",
                  "A broken copper pair because IP ping works.",
                  "A missing hot site because one name fails.",
                  "A wireless channel issue on the server."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Network Service Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n53-network-service-issues-010",
                "objective": "5.3",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.3, Network Service Issues?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician separate DHCP, DNS, route, VLAN, firewall, certificate, and service-state evidence."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Network Service Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n54-performance-issues-section",
        "title": "Section 5.4 - Performance Issues",
        "summary": "Troubleshoot congestion, bottlenecks, latency, jitter, loss, wireless interference, and capacity.",
        "activities": [
          {
            "id": "n54-performance-issues-lesson",
            "type": "lesson",
            "title": "Performance Issues",
            "duration": 18,
            "required": true,
            "domain": 5,
            "objective": "5.4",
            "difficulty": "synthesis",
            "summary": "Performance troubleshooting starts by replacing the word slow with measurable symptoms. Is throughput low, latency high, jitter unstable, packets lost, errors increasing, CPU saturated, Wi-Fi airtime crowded, or one application overloaded? Each cause points to different evidence.",
            "learningObjectives": [
              "Explain common performance causes",
              "Differentiate congestion, latency, jitter, packet loss, and bottlenecks",
              "Choose measurements that prove performance theories"
            ],
            "headings": [
              "Slow is not one problem",
              "Congestion and bottlenecks",
              "Latency, jitter, and loss",
              "Wireless and application contributors",
              "Measurement evidence",
              "Mastery target"
            ],
            "content": [
              "Performance troubleshooting starts by replacing the word slow with measurable symptoms. Is throughput low, latency high, jitter unstable, packets lost, errors increasing, CPU saturated, Wi-Fi airtime crowded, or one application overloaded? Each cause points to different evidence.",
              "Congestion happens when demand exceeds available capacity. A bottleneck is the limiting component in a path, such as an uplink, WAN circuit, firewall, VPN concentrator, server, disk, or wireless channel. More bandwidth helps only when bandwidth is the actual limit.",
              "Latency is delay. Jitter is variation in delay. Packet loss is missing traffic. Voice and video are sensitive to jitter and loss, while file transfers may mainly expose throughput. TCP retransmissions can make an application feel slow even when ping looks acceptable.",
              "Wireless performance can suffer from interference, weak signal, low SNR, crowded channels, poor roaming, excessive channel width, or too many clients sharing airtime. Applications can suffer from server CPU, database latency, DNS delay, TLS problems, or inefficient design.",
              "Evidence includes interface utilization, errors, drops, QoS markings, latency tests, jitter tests, packet loss, flow data, packet captures, wireless controller metrics, server metrics, and baselines. Compare the affected path against known-good behavior and unaffected services.",
              "Mastery means you can choose a measurement that proves the suspected cause and avoid generic fixes such as rebooting devices or buying bandwidth before proving the bottleneck."
            ]
          },
          {
            "id": "n54-performance-issues-scenario",
            "type": "scenario",
            "title": "Worked scenario - Performance Issues",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.4",
            "difficulty": "synthesis",
            "summary": "Apply performance issues to a realistic Network+ decision.",
            "evidence": [
              "Voice calls connect, but audio breaks up when link utilization spikes.",
              "The objective evidence should let the technician measure utilization, latency, jitter, packet loss, errors, flow data, and baselines.",
              "The decision should preserve service while narrowing performance issues to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "Jitter, packet loss, congestion, and QoS handling for real-time traffic.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician measure utilization, latency, jitter, packet loss, errors, flow data, and baselines.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Performance Issues scenario is testing objective 5.4. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n54-performance-issues-cards",
            "type": "flashcards",
            "title": "Performance Issues flashcards",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.4",
            "difficulty": "synthesis",
            "summary": "Practice the terms needed for objective 5.4.",
            "cards": [
              [
                "Congestion",
                "Demand exceeds available capacity."
              ],
              [
                "Bottleneck",
                "The limiting component in an end-to-end path."
              ],
              [
                "Latency",
                "Delay in traffic delivery."
              ],
              [
                "Jitter",
                "Variation in latency."
              ],
              [
                "Packet loss",
                "Traffic that does not arrive successfully."
              ],
              [
                "Throughput",
                "Actual delivered data rate."
              ],
              [
                "Retransmission",
                "Resending data that was lost or not acknowledged."
              ],
              [
                "QoS",
                "Prioritization or marking to protect important traffic."
              ],
              [
                "SNR",
                "Wireless signal strength compared with noise."
              ],
              [
                "Channel utilization",
                "How busy a wireless or network channel is."
              ],
              [
                "Baseline",
                "Known-normal performance used for comparison."
              ],
              [
                "Flow data",
                "Traffic summary showing talkers and volume."
              ]
            ]
          },
          {
            "id": "n54-performance-issues-check",
            "type": "quiz",
            "title": "Performance Issues coached check",
            "duration": 8,
            "required": true,
            "domain": 5,
            "objective": "5.4",
            "difficulty": "synthesis",
            "summary": "Five coached questions for objective 5.4.",
            "questions": [
              {
                "id": "check-n54-performance-issues-001",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n54-performance-issues-002",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Voice calls connect, but audio breaks up when link utilization spikes. Which performance issue is most relevant?",
                "options": [
                  "An incorrect DNS MX record.",
                  "A missing rack label.",
                  "A public cloud tenancy model.",
                  "Jitter, packet loss, congestion, and QoS handling for real-time traffic."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.4, Performance Issues. Jitter, packet loss, congestion, and QoS handling for real-time traffic. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n54-performance-issues-003",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Before changing production settings for Performance Issues, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should measure utilization, latency, jitter, packet loss, errors, flow data, and baselines.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.4: measure utilization, latency, jitter, packet loss, errors, flow data, and baselines. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n54-performance-issues-004",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A help desk note says: \"Voice calls connect, but audio breaks up when link utilization spikes.\" What is the best interpretation?",
                "options": [
                  "A public cloud tenancy model.",
                  "Jitter, packet loss, congestion, and QoS handling for real-time traffic.",
                  "An incorrect DNS MX record.",
                  "A missing rack label."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Performance Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n54-performance-issues-005",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.4, Performance Issues?",
                "options": [
                  "Evidence that lets the technician measure utilization, latency, jitter, packet loss, errors, flow data, and baselines.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Performance Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n54-performance-issues-quiz",
            "type": "quiz",
            "title": "Performance Issues section quiz",
            "duration": 12,
            "required": true,
            "domain": 5,
            "objective": "5.4",
            "difficulty": "synthesis",
            "summary": "Ten section quiz questions for objective 5.4.",
            "questions": [
              {
                "id": "quiz-n54-performance-issues-001",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Performance Issues. Which description correctly matches Flow data?",
                "options": [
                  "Traffic summary showing talkers and volume.",
                  "How busy a wireless or network channel is.",
                  "Prioritization or marking to protect important traffic.",
                  "Actual delivered data rate."
                ],
                "correctIndex": 0,
                "explanation": "Flow data matters in objective 5.4 because Traffic summary showing talkers and volume. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-002",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Voice calls connect, but audio breaks up when link utilization spikes. Which performance issue is most relevant?",
                "options": [
                  "An incorrect DNS MX record.",
                  "A missing rack label.",
                  "A public cloud tenancy model.",
                  "Jitter, packet loss, congestion, and QoS handling for real-time traffic."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.4, Performance Issues. Jitter, packet loss, congestion, and QoS handling for real-time traffic. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-003",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Before changing production settings for Performance Issues, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should measure utilization, latency, jitter, packet loss, errors, flow data, and baselines.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.4: measure utilization, latency, jitter, packet loss, errors, flow data, and baselines. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-004",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A help desk note says: \"Voice calls connect, but audio breaks up when link utilization spikes.\" What is the best interpretation?",
                "options": [
                  "A public cloud tenancy model.",
                  "Jitter, packet loss, congestion, and QoS handling for real-time traffic.",
                  "An incorrect DNS MX record.",
                  "A missing rack label."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Performance Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-005",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.4, Performance Issues?",
                "options": [
                  "Evidence that lets the technician measure utilization, latency, jitter, packet loss, errors, flow data, and baselines.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Performance Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-006",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Performance Issues. Which description correctly matches Retransmission?",
                "options": [
                  "Traffic that does not arrive successfully.",
                  "Delay in traffic delivery.",
                  "Demand exceeds available capacity.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 3,
                "explanation": "Retransmission matters in objective 5.4 because Resending data that was lost or not acknowledged. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-007",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Voice calls connect, but audio breaks up when link utilization spikes. Which performance issue is most relevant?",
                "options": [
                  "A missing rack label.",
                  "A public cloud tenancy model.",
                  "Jitter, packet loss, congestion, and QoS handling for real-time traffic.",
                  "An incorrect DNS MX record."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 5.4, Performance Issues. Jitter, packet loss, congestion, and QoS handling for real-time traffic. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-008",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Before changing production settings for Performance Issues, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should measure utilization, latency, jitter, packet loss, errors, flow data, and baselines.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 5.4: measure utilization, latency, jitter, packet loss, errors, flow data, and baselines. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-009",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A help desk note says: \"Voice calls connect, but audio breaks up when link utilization spikes.\" What is the best interpretation?",
                "options": [
                  "Jitter, packet loss, congestion, and QoS handling for real-time traffic.",
                  "An incorrect DNS MX record.",
                  "A missing rack label.",
                  "A public cloud tenancy model."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Performance Issues, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n54-performance-issues-010",
                "objective": "5.4",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.4, Performance Issues?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician measure utilization, latency, jitter, packet loss, errors, flow data, and baselines."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Performance Issues, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "n55-troubleshooting-tools-and-protocols-section",
        "title": "Section 5.5 - Troubleshooting Tools and Protocols",
        "summary": "Select ping, traceroute, nslookup, packet analyzers, Nmap, cable testers, OTDR, LLDP/CDP, and Wi-Fi analyzers.",
        "activities": [
          {
            "id": "n55-troubleshooting-tools-and-protocols-lesson",
            "type": "lesson",
            "title": "Troubleshooting Tools and Protocols",
            "duration": 18,
            "required": true,
            "domain": 5,
            "objective": "5.5",
            "difficulty": "synthesis",
            "summary": "Troubleshooting tools are only useful when matched to a question. A ping test can show basic reachability, but it does not prove a web server is healthy. A cable tester can find a bad pair, but it does not prove DNS works. Network+ expects you to know what each tool can and cannot prove.",
            "learningObjectives": [
              "Choose the right troubleshooting tool for the question",
              "Explain what each tool proves and what it cannot prove",
              "Use command and hardware-tool evidence safely"
            ],
            "headings": [
              "Tools answer specific questions",
              "IP and name tools",
              "Path and port tools",
              "Packet, cable, and fiber tools",
              "Interpreting evidence",
              "Mastery target"
            ],
            "content": [
              "Troubleshooting tools are only useful when matched to a question. A ping test can show basic reachability, but it does not prove a web server is healthy. A cable tester can find a bad pair, but it does not prove DNS works. Network+ expects you to know what each tool can and cannot prove.",
              "Ping uses ICMP to test reachability and round-trip time. Traceroute shows Layer 3 hops toward a destination. ipconfig, ifconfig, and ip address commands show local addressing. nslookup and dig test DNS answers. arp shows local IP-to-MAC mappings.",
              "Port and path tools answer service questions. netstat or ss can show listening and established sessions. Telnet or nc can test whether a TCP port accepts a connection. nmap can discover hosts and open ports when authorized. Route display commands show local route choices.",
              "Packet analyzers show protocol details and are powerful for proving retransmissions, DNS answers, handshakes, resets, and unexpected traffic. Cable testers, certifiers, toner probes, loopback plugs, multimeters, optical power meters, and OTDRs answer physical-layer questions.",
              "Tool output must be interpreted carefully. A failed ping could mean host down, route missing, firewall blocking ICMP, or wrong address. A successful DNS lookup does not prove the application works. Always tie the tool result back to the theory being tested.",
              "Mastery means you can pick the least disruptive tool that answers the next question, explain the expected output, and decide what to test next based on the result."
            ]
          },
          {
            "id": "n55-troubleshooting-tools-and-protocols-scenario",
            "type": "scenario",
            "title": "Worked scenario - Troubleshooting Tools and Protocols",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.5",
            "difficulty": "synthesis",
            "summary": "Apply troubleshooting tools and protocols to a realistic Network+ decision.",
            "evidence": [
              "A technician needs to see whether DNS returns the expected A and AAAA records.",
              "The objective evidence should let the technician choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question.",
              "The decision should preserve service while narrowing troubleshooting tools and protocols to the most likely layer, service, device, or control."
            ],
            "actions": [
              {
                "label": "nslookup or dig, because they query DNS records directly.",
                "correct": true
              },
              {
                "label": "Collect evidence that lets the technician choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question.",
                "correct": true
              },
              {
                "label": "Verify the result against the original user symptom before closing the issue.",
                "correct": true
              },
              {
                "label": "Make unrelated changes across several layers at the same time.",
                "correct": false
              },
              {
                "label": "Treat one unrelated successful test as proof that the reported issue is fixed.",
                "correct": false
              }
            ],
            "explanation": "This Troubleshooting Tools and Protocols scenario is testing objective 5.5. The correct actions follow the clue, gather evidence, and verify the result; the incorrect actions create noise or close the work before the original symptom is proven fixed."
          },
          {
            "id": "n55-troubleshooting-tools-and-protocols-cards",
            "type": "flashcards",
            "title": "Troubleshooting Tools and Protocols flashcards",
            "duration": 10,
            "required": true,
            "domain": 5,
            "objective": "5.5",
            "difficulty": "synthesis",
            "summary": "Practice the terms needed for objective 5.5.",
            "cards": [
              [
                "ping",
                "Tests basic reachability and round-trip time with ICMP."
              ],
              [
                "traceroute",
                "Shows Layer 3 hops toward a destination."
              ],
              [
                "ipconfig",
                "Windows command for IP configuration details."
              ],
              [
                "ifconfig",
                "Legacy Unix-like command for interface configuration."
              ],
              [
                "ip address",
                "Modern Linux command for interface address details."
              ],
              [
                "nslookup",
                "DNS query tool."
              ],
              [
                "dig",
                "Detailed DNS query tool."
              ],
              [
                "arp",
                "Shows local IP-to-MAC mappings."
              ],
              [
                "netstat",
                "Shows network sessions and listening ports."
              ],
              [
                "nmap",
                "Authorized host and port discovery tool."
              ],
              [
                "Packet analyzer",
                "Captures and inspects packet-level behavior."
              ],
              [
                "OTDR",
                "Fiber troubleshooting tool for distance and faults."
              ]
            ]
          },
          {
            "id": "n55-troubleshooting-tools-and-protocols-check",
            "type": "quiz",
            "title": "Troubleshooting Tools and Protocols coached check",
            "duration": 8,
            "required": true,
            "domain": 5,
            "objective": "5.5",
            "difficulty": "synthesis",
            "summary": "Five coached questions for objective 5.5.",
            "questions": [
              {
                "id": "check-n55-troubleshooting-tools-and-protocols-001",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n55-troubleshooting-tools-and-protocols-002",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A technician needs to see whether DNS returns the expected A and AAAA records. Which tool is best suited?",
                "options": [
                  "OTDR, because it tests fiber distance and reflection.",
                  "A tone generator, because it locates copper cable paths.",
                  "A UPS runtime report, because it proves name resolution.",
                  "nslookup or dig, because they query DNS records directly."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.5, Troubleshooting Tools and Protocols. nslookup or dig, because they query DNS records directly. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n55-troubleshooting-tools-and-protocols-003",
                "objective": "5.5",
                "domain": 5,
                "prompt": "Before changing production settings for Troubleshooting Tools and Protocols, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.5: choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n55-troubleshooting-tools-and-protocols-004",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A help desk note says: \"A technician needs to see whether DNS returns the expected A and AAAA records.\" What is the best interpretation?",
                "options": [
                  "A UPS runtime report, because it proves name resolution.",
                  "nslookup or dig, because they query DNS records directly.",
                  "OTDR, because it tests fiber distance and reflection.",
                  "A tone generator, because it locates copper cable paths."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Troubleshooting Tools and Protocols, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "check-n55-troubleshooting-tools-and-protocols-005",
                "objective": "5.5",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.5, Troubleshooting Tools and Protocols?",
                "options": [
                  "Evidence that lets the technician choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Troubleshooting Tools and Protocols, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          },
          {
            "id": "n55-troubleshooting-tools-and-protocols-quiz",
            "type": "quiz",
            "title": "Troubleshooting Tools and Protocols section quiz",
            "duration": 12,
            "required": true,
            "domain": 5,
            "objective": "5.5",
            "difficulty": "synthesis",
            "summary": "Ten section quiz questions for objective 5.5.",
            "questions": [
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-001",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches OTDR?",
                "options": [
                  "Fiber troubleshooting tool for distance and faults.",
                  "Authorized host and port discovery tool.",
                  "Shows local IP-to-MAC mappings.",
                  "Modern Linux command for interface address details."
                ],
                "correctIndex": 0,
                "explanation": "OTDR matters in objective 5.5 because Fiber troubleshooting tool for distance and faults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-002",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A technician needs to see whether DNS returns the expected A and AAAA records. Which tool is best suited?",
                "options": [
                  "OTDR, because it tests fiber distance and reflection.",
                  "A tone generator, because it locates copper cable paths.",
                  "A UPS runtime report, because it proves name resolution.",
                  "nslookup or dig, because they query DNS records directly."
                ],
                "correctIndex": 3,
                "explanation": "The clue points to objective 5.5, Troubleshooting Tools and Protocols. nslookup or dig, because they query DNS records directly. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-003",
                "objective": "5.5",
                "domain": 5,
                "prompt": "Before changing production settings for Troubleshooting Tools and Protocols, what should the technician verify?",
                "options": [
                  "They should choose the newest technology term in the objective list.",
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question.",
                  "They should restart unrelated devices until the symptom disappears."
                ],
                "correctIndex": 2,
                "explanation": "This is the safer Network+ approach for objective 5.5: choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-004",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A help desk note says: \"A technician needs to see whether DNS returns the expected A and AAAA records.\" What is the best interpretation?",
                "options": [
                  "A UPS runtime report, because it proves name resolution.",
                  "nslookup or dig, because they query DNS records directly.",
                  "OTDR, because it tests fiber distance and reflection.",
                  "A tone generator, because it locates copper cable paths."
                ],
                "correctIndex": 1,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Troubleshooting Tools and Protocols, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-005",
                "objective": "5.5",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.5, Troubleshooting Tools and Protocols?",
                "options": [
                  "Evidence that lets the technician choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question.",
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand."
                ],
                "correctIndex": 0,
                "explanation": "Good Network+ answers tie the concept to proof. For Troubleshooting Tools and Protocols, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-006",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches dig?",
                "options": [
                  "Legacy Unix-like command for interface configuration.",
                  "Shows Layer 3 hops toward a destination.",
                  "Fiber troubleshooting tool for distance and faults.",
                  "Detailed DNS query tool."
                ],
                "correctIndex": 3,
                "explanation": "dig matters in objective 5.5 because Detailed DNS query tool. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-007",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A technician needs to see whether DNS returns the expected A and AAAA records. Which tool is best suited?",
                "options": [
                  "A tone generator, because it locates copper cable paths.",
                  "A UPS runtime report, because it proves name resolution.",
                  "nslookup or dig, because they query DNS records directly.",
                  "OTDR, because it tests fiber distance and reflection."
                ],
                "correctIndex": 2,
                "explanation": "The clue points to objective 5.5, Troubleshooting Tools and Protocols. nslookup or dig, because they query DNS records directly. The distractors are plausible networking ideas, but they do not match the layer, scope, or symptom in this scenario.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-008",
                "objective": "5.5",
                "domain": 5,
                "prompt": "Before changing production settings for Troubleshooting Tools and Protocols, what should the technician verify?",
                "options": [
                  "They should ignore scope because all network symptoms have the same cause.",
                  "They should choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question.",
                  "They should restart unrelated devices until the symptom disappears.",
                  "They should choose the newest technology term in the objective list."
                ],
                "correctIndex": 1,
                "explanation": "This is the safer Network+ approach for objective 5.5: choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question. It keeps troubleshooting tied to observable evidence and limits unnecessary change.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-009",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A help desk note says: \"A technician needs to see whether DNS returns the expected A and AAAA records.\" What is the best interpretation?",
                "options": [
                  "nslookup or dig, because they query DNS records directly.",
                  "OTDR, because it tests fiber distance and reflection.",
                  "A tone generator, because it locates copper cable paths.",
                  "A UPS runtime report, because it proves name resolution."
                ],
                "correctIndex": 0,
                "explanation": "The best interpretation follows the specific clue in the ticket. For Troubleshooting Tools and Protocols, the correct answer connects the symptom to the objective instead of jumping to a broad network reset.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "quiz-n55-troubleshooting-tools-and-protocols-010",
                "objective": "5.5",
                "domain": 5,
                "prompt": "Which evidence would most improve confidence when working through objective 5.5, Troubleshooting Tools and Protocols?",
                "options": [
                  "A successful test of an unrelated service only.",
                  "A change made without a rollback plan.",
                  "A guess based only on the device brand.",
                  "Evidence that lets the technician choose the tool that answers the exact reachability, name, path, port, packet, cable, or fiber question."
                ],
                "correctIndex": 3,
                "explanation": "Good Network+ answers tie the concept to proof. For Troubleshooting Tools and Protocols, the useful evidence is the evidence that confirms the expected traffic flow, service behavior, or physical condition.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      },
      {
        "id": "t5-final-section",
        "title": "Tier 5 final checkpoint",
        "summary": "Mixed review for Network Troubleshooting.",
        "activities": [
          {
            "id": "t5-checkpoint",
            "type": "checkpoint",
            "title": "Tier 5 cumulative checkpoint",
            "duration": 25,
            "required": true,
            "domain": 5,
            "objective": "Tier 5 synthesis",
            "difficulty": "synthesis",
            "summary": "Twenty mixed questions covering Network Troubleshooting.",
            "questions": [
              {
                "id": "checkpoint-tier-5-001-001",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-002-001",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-003-001",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-004-001",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-005-001",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-006-001",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-007-001",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-008-001",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-009-001",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-010-001",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-011-001",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-012-001",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-013-001",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-014-001",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-015-001",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-016-001",
                "objective": "5.1",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-017-001",
                "objective": "5.2",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-018-001",
                "objective": "5.3",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-019-001",
                "objective": "5.4",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "checkpoint-tier-5-020-001",
                "objective": "5.5",
                "domain": 5,
                "prompt": "A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "tier-6",
    "number": 6,
    "title": "Practice Exam",
    "subtitle": "Simulate N10-009 and review weak objectives.",
    "difficulty": "synthesis",
    "color": "#ff7c89",
    "minutes": 90,
    "recommendedAfter": 5,
    "modules": [
      {
        "id": "t6-practice-section",
        "title": "Domain-weighted practice exam",
        "summary": "A 90-question original exam with practice and timed modes.",
        "activities": [
          {
            "id": "t6-practice-exam",
            "type": "exam",
            "title": "Network+ N10-009 practice exam",
            "duration": 90,
            "required": true,
            "domain": 1,
            "objective": "N10-009 synthesis",
            "difficulty": "synthesis",
            "summary": "Ninety original questions weighted to the official Network+ domain percentages.",
            "questions": [
              {
                "id": "n10-009-exam-001",
                "objective": "1.1",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 1 - Physical?",
                "options": [
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Establishing, maintaining, and ending conversations between systems.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 0,
                "explanation": "Layer 1 - Physical matters in objective 1.1 because it covers signals, media, connectors, transceivers, cabling, radio, and link lights. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-002",
                "objective": "1.2",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Router?",
                "options": [
                  "Forwards packets between IP networks.",
                  "Enforces traffic policy between networks or zones.",
                  "Inspects inline and can block suspicious traffic.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 1.2 because Forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-003",
                "objective": "1.3",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches VPC?",
                "options": [
                  "Logically isolated cloud network.",
                  "Cloud network policy often applied at subnet level.",
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 0,
                "explanation": "VPC matters in objective 1.3 because Logically isolated cloud network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-004",
                "objective": "1.4",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches FTP?",
                "options": [
                  "File transfer protocol using ports 20 and 21.",
                  "Name resolution service using port 53.",
                  "Web traffic using port 80.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 0,
                "explanation": "FTP matters in objective 1.4 because File transfer protocol using ports 20 and 21. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-005",
                "objective": "1.5",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches Twisted pair?",
                "options": [
                  "Copper Ethernet cable used for many LAN connections.",
                  "Fiber used for shorter fiber runs, often inside buildings.",
                  "Small form-factor pluggable transceiver module.",
                  "Connector associated with coaxial cabling."
                ],
                "correctIndex": 0,
                "explanation": "Twisted pair matters in objective 1.5 because Copper Ethernet cable used for many LAN connections. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-006",
                "objective": "1.6",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Topologies, Architectures, and Network Types. Which description correctly matches Star topology?",
                "options": [
                  "Endpoints connect through a central device.",
                  "Direct connection between two endpoints or sites.",
                  "Where endpoints attach to the network.",
                  "High-speed backbone layer."
                ],
                "correctIndex": 0,
                "explanation": "Star topology matters in objective 1.6 because Endpoints connect through a central device. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-007",
                "objective": "1.7",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing IPv4 Addressing and Subnetting. Which description correctly matches IPv4?",
                "options": [
                  "32-bit Layer 3 addressing system.",
                  "Slash notation for network prefix length.",
                  "Private IPv4 range from 172.16 through 172.31.",
                  "127.0.0.0/8 local host testing range."
                ],
                "correctIndex": 0,
                "explanation": "IPv4 matters in objective 1.7 because 32-bit Layer 3 addressing system. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-008",
                "objective": "1.8",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Modern Network Environments. Which description correctly matches SDN?",
                "options": [
                  "Centralized software-defined network control.",
                  "Packet forwarding part of networking.",
                  "Cloud-delivered network and security architecture.",
                  "128-bit IP addressing system."
                ],
                "correctIndex": 0,
                "explanation": "SDN matters in objective 1.8 because Centralized software-defined network control. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-009",
                "objective": "1.1",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 1 - Physical?",
                "options": [
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Establishing, maintaining, and ending conversations between systems.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 0,
                "explanation": "Layer 1 - Physical matters in objective 1.1 because it covers signals, media, connectors, transceivers, cabling, radio, and link lights. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-010",
                "objective": "1.2",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Router?",
                "options": [
                  "Forwards packets between IP networks.",
                  "Enforces traffic policy between networks or zones.",
                  "Inspects inline and can block suspicious traffic.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 1.2 because Forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-011",
                "objective": "1.3",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches VPC?",
                "options": [
                  "Logically isolated cloud network.",
                  "Cloud network policy often applied at subnet level.",
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 0,
                "explanation": "VPC matters in objective 1.3 because Logically isolated cloud network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-012",
                "objective": "1.4",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches FTP?",
                "options": [
                  "File transfer protocol using ports 20 and 21.",
                  "Name resolution service using port 53.",
                  "Web traffic using port 80.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 0,
                "explanation": "FTP matters in objective 1.4 because File transfer protocol using ports 20 and 21. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-013",
                "objective": "1.5",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches Twisted pair?",
                "options": [
                  "Copper Ethernet cable used for many LAN connections.",
                  "Fiber used for shorter fiber runs, often inside buildings.",
                  "Small form-factor pluggable transceiver module.",
                  "Connector associated with coaxial cabling."
                ],
                "correctIndex": 0,
                "explanation": "Twisted pair matters in objective 1.5 because Copper Ethernet cable used for many LAN connections. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-014",
                "objective": "1.6",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Topologies, Architectures, and Network Types. Which description correctly matches Star topology?",
                "options": [
                  "Endpoints connect through a central device.",
                  "Direct connection between two endpoints or sites.",
                  "Where endpoints attach to the network.",
                  "High-speed backbone layer."
                ],
                "correctIndex": 0,
                "explanation": "Star topology matters in objective 1.6 because Endpoints connect through a central device. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-015",
                "objective": "1.7",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing IPv4 Addressing and Subnetting. Which description correctly matches IPv4?",
                "options": [
                  "32-bit Layer 3 addressing system.",
                  "Slash notation for network prefix length.",
                  "Private IPv4 range from 172.16 through 172.31.",
                  "127.0.0.0/8 local host testing range."
                ],
                "correctIndex": 0,
                "explanation": "IPv4 matters in objective 1.7 because 32-bit Layer 3 addressing system. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-016",
                "objective": "1.8",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Modern Network Environments. Which description correctly matches SDN?",
                "options": [
                  "Centralized software-defined network control.",
                  "Packet forwarding part of networking.",
                  "Cloud-delivered network and security architecture.",
                  "128-bit IP addressing system."
                ],
                "correctIndex": 0,
                "explanation": "SDN matters in objective 1.8 because Centralized software-defined network control. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-017",
                "objective": "1.1",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing OSI Reference Model. Which description correctly matches Layer 1 - Physical?",
                "options": [
                  "Signals, media, connectors, transceivers, cabling, radio, and link lights.",
                  "IP addressing, routing, subnets, gateways, and ICMP.",
                  "Establishing, maintaining, and ending conversations between systems.",
                  "User-facing network services and protocols such as HTTP, DNS, DHCP, and SMB."
                ],
                "correctIndex": 0,
                "explanation": "Layer 1 - Physical matters in objective 1.1 because it covers signals, media, connectors, transceivers, cabling, radio, and link lights. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-018",
                "objective": "1.2",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Network Appliances and Functions. Which description correctly matches Router?",
                "options": [
                  "Forwards packets between IP networks.",
                  "Enforces traffic policy between networks or zones.",
                  "Inspects inline and can block suspicious traffic.",
                  "Makes requests on behalf of clients and can enforce policy."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 1.2 because Forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-019",
                "objective": "1.3",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Cloud Concepts and Connectivity. Which description correctly matches VPC?",
                "options": [
                  "Logically isolated cloud network.",
                  "Cloud network policy often applied at subnet level.",
                  "Allows private cloud resources to initiate outbound internet access.",
                  "Private connectivity to a cloud provider."
                ],
                "correctIndex": 0,
                "explanation": "VPC matters in objective 1.3 because Logically isolated cloud network. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-020",
                "objective": "1.4",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Ports, Protocols, Services, and Traffic. Which description correctly matches FTP?",
                "options": [
                  "File transfer protocol using ports 20 and 21.",
                  "Name resolution service using port 53.",
                  "Web traffic using port 80.",
                  "Monitoring protocol using ports 161 and 162."
                ],
                "correctIndex": 0,
                "explanation": "FTP matters in objective 1.4 because File transfer protocol using ports 20 and 21. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-021",
                "objective": "1.5",
                "domain": 1,
                "prompt": "[Networking Concepts] A Network+ learner is reviewing Transmission Media and Transceivers. Which description correctly matches Twisted pair?",
                "options": [
                  "Copper Ethernet cable used for many LAN connections.",
                  "Fiber used for shorter fiber runs, often inside buildings.",
                  "Small form-factor pluggable transceiver module.",
                  "Connector associated with coaxial cabling."
                ],
                "correctIndex": 0,
                "explanation": "Twisted pair matters in objective 1.5 because Copper Ethernet cable used for many LAN connections. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-022",
                "objective": "2.1",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-023",
                "objective": "2.2",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-024",
                "objective": "2.3",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-025",
                "objective": "2.4",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-026",
                "objective": "2.1",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-027",
                "objective": "2.2",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-028",
                "objective": "2.3",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-029",
                "objective": "2.4",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-030",
                "objective": "2.1",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-031",
                "objective": "2.2",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-032",
                "objective": "2.3",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-033",
                "objective": "2.4",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-034",
                "objective": "2.1",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-035",
                "objective": "2.2",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-036",
                "objective": "2.3",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Wireless Technologies. Which description correctly matches SSID?",
                "options": [
                  "The wireless network name advertised or configured for clients.",
                  "Longer range band with fewer non-overlapping channels.",
                  "Newer Wi-Fi band with additional clean spectrum.",
                  "Received signal strength indicator."
                ],
                "correctIndex": 0,
                "explanation": "SSID matters in objective 2.3 because The wireless network name advertised or configured for clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-037",
                "objective": "2.4",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Physical Installation Factors. Which description correctly matches MDF?",
                "options": [
                  "Main distribution frame, often the primary network room.",
                  "Termination point that maps cabling to switch patch cords.",
                  "Organizing cables to protect airflow, bend radius, and traceability.",
                  "Battery backup that keeps equipment online during power loss."
                ],
                "correctIndex": 0,
                "explanation": "MDF matters in objective 2.4 because Main distribution frame, often the primary network room. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-038",
                "objective": "2.1",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Routing Technologies. Which description correctly matches Router?",
                "options": [
                  "A Layer 3 device that forwards packets between IP networks.",
                  "A manually configured route to a destination network or default path.",
                  "A value used by routing protocols to prefer one path over another.",
                  "Fallback route used when no more specific route matches."
                ],
                "correctIndex": 0,
                "explanation": "Router matters in objective 2.1 because A Layer 3 device that forwards packets between IP networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-039",
                "objective": "2.2",
                "domain": 2,
                "prompt": "[Network Implementation] A Network+ learner is reviewing Switching Technologies. Which description correctly matches Switch?",
                "options": [
                  "Forwards Ethernet frames inside a LAN using MAC addresses.",
                  "A logical Layer 2 broadcast domain.",
                  "A link that carries tagged frames for multiple VLANs.",
                  "A virtual Layer 3 interface for a VLAN."
                ],
                "correctIndex": 0,
                "explanation": "Switch matters in objective 2.2 because Forwards Ethernet frames inside a LAN using MAC addresses. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-040",
                "objective": "3.1",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-041",
                "objective": "3.2",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-042",
                "objective": "3.3",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-043",
                "objective": "3.4",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-044",
                "objective": "3.5",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-045",
                "objective": "3.1",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-046",
                "objective": "3.2",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-047",
                "objective": "3.3",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-048",
                "objective": "3.4",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-049",
                "objective": "3.5",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-050",
                "objective": "3.1",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-051",
                "objective": "3.2",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-052",
                "objective": "3.3",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Disaster Recovery Concepts. Which description correctly matches RPO?",
                "options": [
                  "Maximum acceptable data loss measured in time.",
                  "Mean time to repair or recover.",
                  "Recovery site kept ready for rapid failover.",
                  "Basic recovery location requiring significant setup."
                ],
                "correctIndex": 0,
                "explanation": "RPO matters in objective 3.3 because Maximum acceptable data loss measured in time. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-053",
                "objective": "3.4",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing IPv4 and IPv6 Network Services. Which description correctly matches DHCP?",
                "options": [
                  "Automatically assigns IP configuration to clients.",
                  "Predictable lease for a known client.",
                  "Name resolution service.",
                  "DNS record mapping a name to IPv6."
                ],
                "correctIndex": 0,
                "explanation": "DHCP matters in objective 3.4 because Automatically assigns IP configuration to clients. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-054",
                "objective": "3.5",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Remote Access Methods. Which description correctly matches Site-to-site VPN?",
                "options": [
                  "Encrypted connection between networks.",
                  "All client traffic traverses the VPN.",
                  "Secure command-line remote access, commonly port 22.",
                  "Controlled intermediary used for administrative access."
                ],
                "correctIndex": 0,
                "explanation": "Site-to-site VPN matters in objective 3.5 because Encrypted connection between networks. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-055",
                "objective": "3.1",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Organizational Processes and Procedures. Which description correctly matches Physical diagram?",
                "options": [
                  "Shows real-world device, cable, rack, and room relationships.",
                  "Tracked list of devices, owners, versions, locations, and support data.",
                  "Steps to return to the previous working state.",
                  "End of life; vendor no longer sells or develops a product."
                ],
                "correctIndex": 0,
                "explanation": "Physical diagram matters in objective 3.1 because Shows real-world device, cable, rack, and room relationships. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-056",
                "objective": "3.2",
                "domain": 3,
                "prompt": "[Network Operations] A Network+ learner is reviewing Network Monitoring Technologies. Which description correctly matches Baseline?",
                "options": [
                  "Known-normal performance or behavior used for comparison.",
                  "Device-generated alert sent to a monitoring system.",
                  "Centralized event logging from network devices and systems.",
                  "Counters such as CRC or drops that indicate link trouble."
                ],
                "correctIndex": 0,
                "explanation": "Baseline matters in objective 3.2 because Known-normal performance or behavior used for comparison. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-057",
                "objective": "4.1",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-058",
                "objective": "4.2",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-059",
                "objective": "4.3",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-060",
                "objective": "4.1",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-061",
                "objective": "4.2",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-062",
                "objective": "4.3",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-063",
                "objective": "4.1",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-064",
                "objective": "4.2",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-065",
                "objective": "4.3",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-066",
                "objective": "4.1",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-067",
                "objective": "4.2",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Network Attacks and Impacts. Which description correctly matches DoS?",
                "options": [
                  "Attack that denies service from one source or method.",
                  "Forging ARP information to redirect local traffic.",
                  "Unauthorized DHCP service giving clients bad settings.",
                  "Malicious AP imitating a legitimate wireless network."
                ],
                "correctIndex": 0,
                "explanation": "DoS matters in objective 4.2 because Attack that denies service from one source or method. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-068",
                "objective": "4.3",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Security Features and Defense Techniques. Which description correctly matches Device hardening?",
                "options": [
                  "Reducing device attack surface and insecure defaults.",
                  "Traffic permit or deny rules.",
                  "Blocks forged ARP using trusted binding data.",
                  "Port-based network authentication."
                ],
                "correctIndex": 0,
                "explanation": "Device hardening matters in objective 4.3 because Reducing device attack surface and insecure defaults. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-069",
                "objective": "4.1",
                "domain": 4,
                "prompt": "[Network Security] A Network+ learner is reviewing Basic Network Security Concepts. Which description correctly matches Authorization?",
                "options": [
                  "Determining what an identity may access.",
                  "Permissions assigned through roles.",
                  "Dividing networks into controlled zones.",
                  "Network access control based on identity or posture."
                ],
                "correctIndex": 0,
                "explanation": "Authorization matters in objective 4.1 because Determining what an identity may access. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-070",
                "objective": "5.1",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-071",
                "objective": "5.2",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-072",
                "objective": "5.3",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-073",
                "objective": "5.4",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-074",
                "objective": "5.5",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-075",
                "objective": "5.1",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-076",
                "objective": "5.2",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-077",
                "objective": "5.3",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-078",
                "objective": "5.4",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-079",
                "objective": "5.5",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-080",
                "objective": "5.1",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-081",
                "objective": "5.2",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-082",
                "objective": "5.3",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-083",
                "objective": "5.4",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-084",
                "objective": "5.5",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-085",
                "objective": "5.1",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-086",
                "objective": "5.2",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Cabling and Physical Interface Issues. Which description correctly matches CRC error?",
                "options": [
                  "Frame check error often associated with physical problems.",
                  "Frames larger than expected maximum size.",
                  "Interface repeatedly goes up and down.",
                  "Tool that validates cabling meets a standard."
                ],
                "correctIndex": 0,
                "explanation": "CRC error matters in objective 5.2 because Frame check error often associated with physical problems. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-087",
                "objective": "5.3",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Network Service Issues. Which description correctly matches APIPA?",
                "options": [
                  "169.254.0.0/16 address often indicating DHCP failure.",
                  "Two devices use the same IP address.",
                  "Old cached answer causing incorrect resolution.",
                  "No route exists to a destination network."
                ],
                "correctIndex": 0,
                "explanation": "APIPA matters in objective 5.3 because 169.254.0.0/16 address often indicating DHCP failure. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-088",
                "objective": "5.4",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Performance Issues. Which description correctly matches Congestion?",
                "options": [
                  "Demand exceeds available capacity.",
                  "Delay in traffic delivery.",
                  "Traffic that does not arrive successfully.",
                  "Resending data that was lost or not acknowledged."
                ],
                "correctIndex": 0,
                "explanation": "Congestion matters in objective 5.4 because Demand exceeds available capacity. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-089",
                "objective": "5.5",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Tools and Protocols. Which description correctly matches ping?",
                "options": [
                  "Tests basic reachability and round-trip time with ICMP.",
                  "Windows command for IP configuration details.",
                  "Modern Linux command for interface address details.",
                  "Shows local IP-to-MAC mappings."
                ],
                "correctIndex": 0,
                "explanation": "ping matters in objective 5.5 because Tests basic reachability and round-trip time with ICMP. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              },
              {
                "id": "n10-009-exam-090",
                "objective": "5.1",
                "domain": 5,
                "prompt": "[Network Troubleshooting] A Network+ learner is reviewing Troubleshooting Methodology. Which description correctly matches Identify the problem?",
                "options": [
                  "Gather symptoms, scope, users, changes, and expected behavior.",
                  "Use evidence to confirm or reject the explanation.",
                  "Fix plan that considers impact and rollback.",
                  "Confirm the service works and no new issues appeared."
                ],
                "correctIndex": 0,
                "explanation": "Identify the problem matters in objective 5.1 because Gather symptoms, scope, users, changes, and expected behavior. In a scenario, confirm it with evidence instead of guessing from the topic name alone.",
                "source": {
                  "title": "CompTIA Network+ N10-009 exam objectives",
                  "url": "https://www.comptia.org/en-us/certifications/network/"
                }
              }
            ],
            "config": {
              "allowModeSelection": true,
              "timedMinutes": 90,
              "passingScore": 0.72
            }
          }
        ]
      }
    ]
  },
  {
    "id": "tier-subnetting",
    "number": "Subnet",
    "title": "Subnetting Practice",
    "subtitle": "Fast repeated subnetting drills plus separate concept lessons.",
    "difficulty": "practice",
    "color": "#00f5ff",
    "minutes": 45,
    "recommendedAfter": 1,
    "modules": [
      {
        "id": "subnetting-lab-section",
        "title": "Subnetting Practice - Calculator Drills",
        "summary": "Run hundreds of subnetting problems in a simple answer-and-check workflow.",
        "activities": [
          {
            "id": "subnetting-calculator-lab",
            "type": "subnetting",
            "title": "Subnetting Practice Calculator",
            "duration": 45,
            "required": false,
            "domain": 6,
            "objective": "Subnetting",
            "difficulty": "practice",
            "summary": "A fast subnetting drill modeled as repeated IP/CIDR questions: type network, broadcast, wildcard, and valid host count, then check answers.",
            "defaultAddress": "192.168.14.77",
            "defaultPrefix": 26,
            "headings": [],
            "content": []
          }
        ]
      },
      {
        "id": "subnetting-explanations-section",
        "title": "Subnetting Lessons - Binary and CIDR Explanations",
        "summary": "Concept page for binary octets, CIDR boundaries, wildcard masks, and host math.",
        "activities": [
          {
            "id": "subnetting-explanations-page",
            "type": "lesson",
            "title": "Subnetting Binary and CIDR Explanations",
            "duration": 20,
            "required": false,
            "domain": 6,
            "objective": "Subnetting",
            "difficulty": "foundation",
            "summary": "A separate explanation page for the subnetting concepts used by the practice calculator.",
            "learningObjectives": [
              "Convert octets with 128-64-32-16-8-4-2-1 weights",
              "Explain how CIDR prefixes create subnet boundaries",
              "Calculate network, broadcast, wildcard, and usable host count"
            ],
            "headings": [
              "Binary octets",
              "CIDR boundaries",
              "Network and broadcast",
              "Wildcard mask",
              "Host count",
              "Practice workflow"
            ],
            "content": [
              "Every IPv4 octet is eight bits. The bit weights are 128, 64, 32, 16, 8, 4, 2, and 1. Decimal values are just the sum of the enabled bit weights.",
              "A CIDR prefix tells you how many bits are fixed as network bits. A /29 has 29 network bits and 3 host bits, so each subnet has 8 total addresses.",
              "The network address is the first address in the block. The broadcast address is the last address in the block. Traditional usable host addresses sit between those two endpoints.",
              "The wildcard mask is the inverse of the subnet mask. If the subnet mask is 255.255.255.248, the wildcard is 0.0.0.7.",
              "Usable host count is 2 raised to the number of host bits, minus 2 for traditional IPv4 subnets. A /29 has 3 host bits, so 2^3 - 2 = 6 usable hosts.",
              "Use the practice calculator by solving on paper first, then checking. Repeat the same sequence every time: prefix, mask, block size, containing block, network, broadcast, wildcard, valid hosts."
            ]
          }
        ]
      }
    ]
  }
]

export const masterFlashcardsActivity = {
  id: 'master-flashcards',
  type: 'flashcards',
  title: 'Master Network+ flashcards',
  duration: 45,
  required: false,
  domain: 1,
  objective: 'Review',
  difficulty: 'synthesis',
  summary: 'Shuffle every Network+ flashcard deck.',
  cards: tiers.flatMap((tier) =>
    tier.modules.flatMap((module) =>
      module.activities
        .filter((activity) => activity.type === 'flashcards')
        .flatMap((activity) => activity.cards),
    ),
  ),
  shuffleCards: true,
  tierId: 'standalone-flashcards',
  tierNumber: 'Review',
  moduleId: 'master-flashcards-section',
}

export const allActivities = [
  ...tiers.flatMap((tier) =>
    tier.modules.flatMap((module) =>
      module.activities.map((activity) => ({
        ...activity,
        tierId: tier.id,
        tierNumber: tier.number,
        moduleId: module.id,
      })),
    ),
  ),
  masterFlashcardsActivity,
]

export function getActivity(activityId) {
  return allActivities.find((activity) => activity.id === activityId)
}

export function getTier(tierId) {
  return tiers.find((tier) => tier.id === tierId)
}
