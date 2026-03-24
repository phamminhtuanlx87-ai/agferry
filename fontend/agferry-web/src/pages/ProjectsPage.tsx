import FilterProject from "@/components/project/FilterProject";
import ProjectTable from "@/components/project/ProjectTable";
import { projects } from "@/data/projects";
import { Link } from "react-router-dom";

const ProjectsPage = () => {
  return (
    <>
      <section className="flex-1 p-6 overflow-y-auto md:ml-10">
        <div className="content-2 table-list bg-white border border-gray-50 border-shadow flex flex-col gap-5">
          <div className="flex items-center justify-between">
            <h1 className="text-sm md:text-2xl font-semibold">
              Danh sách công trình
            </h1>
            <Link
              to="/projects/addproject"
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg shadow hover:opacity-90 transition text-sm font-semibold"
            >
              + Thêm công trình
            </Link>
          </div>
          <FilterProject></FilterProject>
          <ProjectTable projects={projects} rowsPerPage={10}></ProjectTable>
        </div>
      </section>
    </>
  );
};

export default ProjectsPage;
