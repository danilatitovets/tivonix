import Container from "../ui/Container";
import Section from "../ui/Section";

const steps = [
  { n: "1", t: "Выбираешь блок", d: "Каждый блок — отдельный компонент в папке landing." },
  { n: "2", t: "Правишь контент", d: "Меняешь тексты, кнопки, картинки — не ломая верстку." },
  { n: "3", t: "Добавляешь эффекты", d: "Градиенты, стекло, анимации — всё поверх готовой базы." },
];

export default function HowItWorks() {
  return (
    <Section id="how">
      <Container>
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-sm text-white/55">Блок</div>
            <h2 className="mt-1 font-display text-3xl sm:text-4xl font-extrabold">
              Как это устроено
            </h2>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="relative rounded-[26px] border border-white/10 bg-white/5 backdrop-blur-xl p-6"
            >
              <div className="absolute inset-x-6 top-0 h-px bg-[var(--g)] opacity-40" />
              <div className="text-4xl font-display font-extrabold text-white/85">
                {s.n}
              </div>
              <div className="mt-2 text-lg font-semibold">{s.t}</div>
              <div className="mt-2 text-sm text-white/65">{s.d}</div>
            </div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
