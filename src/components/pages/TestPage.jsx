import { useParams } from "solid-app-router";

export default function TestPage () {

    const params = useParams();

    return <div>
       This is a test page {params.id}
    </div>

};