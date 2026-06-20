export function SubnettingExplanations() {
  const sections = [
    [
      "Binary octets",
      "Every IPv4 octet is eight bits with place values 128, 64, 32, 16, 8, 4, 2, and 1. Decimal 248 is 11111000 because 128+64+32+16+8 are on and 4+2+1 are off.",
    ],
    [
      "CIDR boundary",
      "A /29 means the first 29 bits are network bits and the last 3 bits are host bits. The mask is 255.255.255.248. Those last 3 host bits create 8 total addresses per subnet.",
    ],
    [
      "Network address",
      "The network address is the first address in the subnet block. It is where all host bits are 0. It identifies the subnet itself, so it is not counted as a traditional usable host address.",
    ],
    [
      "Broadcast address",
      "The broadcast address is the last address in the block. It is where all host bits are 1. It reaches all hosts in that IPv4 subnet and is not counted as a traditional usable host address.",
    ],
    [
      "Wildcard mask",
      "The wildcard mask is the inverse of the subnet mask. If the mask is 255.255.255.248, the wildcard is 0.0.0.7. It shows which bits can vary inside the subnet.",
    ],
    [
      "Max valid hosts",
      "Traditional usable host count is 2 to the power of host bits, minus 2. A /29 has 3 host bits, so 2^3 is 8 total addresses, and 8-2 leaves 6 usable host addresses.",
    ],
  ]

  return (
    <div className="page subnet-explain-page">
      <div className="page-intro">
        <div>
          <p className="eyebrow">Subnetting explanations</p>
          <h2>Learn the pattern, then drill it fast.</h2>
          <p>
            The practice page is intentionally simple. This page holds the
            why: binary weights, CIDR boundaries, wildcard masks, and host math.
          </p>
        </div>
      </div>
      <section className="subnet-explain-grid">
        {sections.map(([title, body]) => (
          <article className="subnet-explain-card" key={title}>
            <h3>{title}</h3>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="subnet-binary-strip" aria-label="Binary octet weights">
        {[128, 64, 32, 16, 8, 4, 2, 1].map((weight) => (
          <span key={weight}>{weight}</span>
        ))}
      </section>
    </div>
  )
}
