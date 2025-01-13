import { Github } from "../../icons/Github";
import { LinkedIn } from "../../icons/LinkedIn";
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
        <div className="top-0 absolute header-content w-full h-full">
          <div className="mx-auto max-w-screen-2xl relative h-full">
            <h1 className="absolute bottom-0 ps-5"> {title}</h1>
            <div className="absolute top-8 sm:top-auto sm:bottom-6 right-4">
              <div className="flex items-center">
                <a
                  className="text-black"
                  href="https://github.com/andrehapereira"
                  target="_blank"
                >
                  <Github />
                </a>
                <a
                  className="text-black ms-3"
                  href="https://www.linkedin.com/in/andrehapereira/"
                  target="_blank"
                >
                  <LinkedIn />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
