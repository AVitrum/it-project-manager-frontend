import { useParams } from "react-router-dom";

function ProjectPage() {
    const { id } = useParams<string>();

    return (
        <div>ProjectPage: {id}</div>
    )
}

export default ProjectPage