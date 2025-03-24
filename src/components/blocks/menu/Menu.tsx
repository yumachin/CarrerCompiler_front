import LinkButtons from '../LinkButtons';

export default function Menu( props: { open: boolean } ) {
  return (
    <div className="pt-20">
      <aside className={`${props.open ? 'translate-x-0' : '-translate-x-full'} fixed z-20 w-48 h-full bg-teal-900 border-r transition-transform duration-200 ease-in-out sm:translate-x-0`}>
        <LinkButtons />
      </aside>
    </div>
  );
};