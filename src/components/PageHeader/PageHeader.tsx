import "./PageHeader.css";

export type PageHeaderProps = {
  title: string;
  background?: string;
};

export const PageHeader = ({ title, background }: PageHeaderProps) => {
  const bg = background ?? "https://picsum.photos/1200/300";
  return (
    <>
      <section className="relative w-full">
        <div className="background-container w-full h-page-header">
          <img className="w-full" src={bg} alt={title} />
        </div>
        <div className="header-content max-w-screen-2xl mx-auto">
        <h1 className="absolute bottom-0 ps-5"> {title}</h1>

        </div>
      </section>
    </>
  );
};
