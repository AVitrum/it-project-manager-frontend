import { useNavigate } from "react-router-dom";
import "../../assets/project-square.css";
import { ProjectResponse } from "../../types/responses";

function ProjectSquare({ data, onClick }: { data: ProjectResponse, onClick: any }) {

  return (
    <div className="project-square" onClick={onClick}>
      {data.image ?
        <div className="image-container" style={{ backgroundImage: `url(${data.image})` }}></div> :
        <div className="image-container" style={{ backgroundImage: `url("project-default1.jpg")` }}></div>
      }
      <h4>{data.name}</h4>
    </div>
  );
}

export function ProjectSquareCreate({ id }: { id: number }) {
  const navigate = useNavigate();
  return (
    <div className="project-square" onClick={() => navigate(`/createProject/${id}`)}>
      <div className="image-container" style={{ backgroundImage: `url("3548176.jpg")` }}></div>
      <h4>Create new project</h4>
    </div>
  );
}

export default ProjectSquare;