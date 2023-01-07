import { ReactNode } from "react"

type SectionProps = {
    children: ReactNode;
}

function Section(props: SectionProps) {
  return (
    <section>
        {props.children}
    </section>
  )
}

export default Section