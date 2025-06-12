import LinkButtons from "../LinkButtons";

export default function Menu() {
  return (
    <div className="pt-20">
      <aside className="fixed z-20 w-44 h-full bg-teal-900">
        <LinkButtons />
      </aside>
    </div>
  );
}
