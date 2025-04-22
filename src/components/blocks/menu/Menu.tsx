import LinkButtons from "../LinkButtons";

export default function Menu() {
  return (
    <div className="pt-20">
      <aside className="-translate-x-full fixed z-20 w-40 h-full bg-teal-900 border-r transition-transform duration-200 ease-in-out sm:translate-x-0">
        <LinkButtons />
      </aside>
    </div>
  );
}
