import { GithubIcon } from "../../icons/GithubIcon";
import { LinkedInIcon } from "../../icons/LinkedInIcon";
import "./PageHeaderComponent.css";

export type PageHeaderComponentProps = {
  title: string;
  background?: string;
};

export const PageHeaderComponent = ({
  title,
  background,
}: PageHeaderComponentProps) => {
  const bg = background ?? "https://picsum.photos/1200/300";
  return (
    <>
      <section className="relative w-full">
        <div className="background-container w-full h-page-header bg-gray-300">
          <img
            className="w-full"
            src={bg}
            alt={title}
            onLoad={(ef) => {
              ef.currentTarget.classList.add("fade-in");
            }}
            onError={(e) => e.currentTarget.classList.add("hidden")}
          />
        </div>
        <div className="top-0 absolute header-content w-full h-full">
          <div className="mx-auto max-w-screen-2xl relative h-full">
            <h1 className="absolute bottom-0 ps-5">{title}</h1>
            <div className="absolute top-8 sm:top-auto sm:bottom-6 right-4">
              <div className="flex items-center">
                <a
                  className="text-black"
                  href="https://github.com/andrehapereira"
                  target="_blank"
                >
                  <GithubIcon />
                </a>
                <a
                  className="text-black ms-3"
                  href="https://www.linkedin.com/in/andrehapereira/"
                  target="_blank"
                >
                  <LinkedInIcon />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
