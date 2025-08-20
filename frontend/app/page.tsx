import NavBox from "@/components/NavBox";

export default function Home() {
  return (
    <main className="min-h-dvh">
      <section className="min-h-dvh flex justify-center">
        <div className="grid grid-cols-1 gap-6 place-items-center">
          <NavBox href="/envios" label="Envios" />
          <NavBox href="/futuro" label="futuro" />
          <NavBox href="/futuro" label="futuro" />
          <NavBox href="/futuro" label="futuro" />
        </div>
      </section>
    </main>
  );
}
