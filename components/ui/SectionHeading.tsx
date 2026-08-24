import { Reveal } from "@/components/motion/Reveal";

type SectionHeadingProps = {
  readonly headingId: string;
  readonly index: string;
  readonly title: string;
  readonly description: string;
};

export function SectionHeading({ headingId, index, title, description }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <Reveal>
        <p className="eyebrow">{index}</p>
        <h2 id={headingId}>{title}</h2>
      </Reveal>
      <Reveal delay={0.08}>
        <p>{description}</p>
      </Reveal>
    </div>
  );
}
