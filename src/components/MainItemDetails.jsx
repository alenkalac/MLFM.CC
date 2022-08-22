import { Show } from "solid-js";
import ItemJob from "./partials/ItemJob";

export default function MainItemDetails(props) {

    let jobs = [];

    props.data.jobs.forEach(element => {
        jobs.push(element.job);
    });

    return <>
        <div class="mt-4">
            <h2 class="text-center text-2xl font-bold" >{props.data.item_name}</h2>
            <Show when={props.data.item_requirements}>
                <div class="text-center">Lv: {props.data.item_requirements.level}</div>
                <div class="text-center flex justify-center mt-2 mb-5">
                    <sub class="ml-2">Req:</sub>
                    <sub class="ml-1 mr-1">Str:     {props.data.item_requirements.str} </sub>
                    <sub class="ml-1 mr-1">Dex:     {props.data.item_requirements.dex} </sub>
                    <sub class="ml-1 mr-1">Int:     {props.data.item_requirements.int} </sub>
                    <sub class="ml-1 mr-1">Luk:     {props.data.item_requirements.luk} </sub>
                    <sub class="ml-1 mr-1">Fame:    {props.data.item_requirements.fame} </sub>
                </div>
                <div class="text-center flex justify-center mt-1 mb-5">
                    <ItemJob job="Beginner" active={jobs.includes("Beginner")}/>
                    <ItemJob job="Warrior"  active={jobs.includes("Warrior")    || jobs.includes("Beginner")}/>
                    <ItemJob job="Magician" active={jobs.includes("Magician")   || jobs.includes("Beginner")}/>
                    <ItemJob job="Bowman"   active={jobs.includes("Bowman")     || jobs.includes("Beginner")}/>
                    <ItemJob job="Thief"    active={jobs.includes("Thief")      || jobs.includes("Beginner")}/>
                    <ItemJob job="Pirate"   active={jobs.includes("Pirate")     || jobs.includes("Beginner")}/>
                </div>
            </Show>
            <div class="flex justify-center p-4">
                <img src={props.data.item_icon + "?resize=4"}></img>
            </div>
            <div class="font-sans text-center" innerHTML={props.data.item_description.replaceAll("\\n", "<br />").replaceAll("\\r", "").replaceAll("#c", "<strong>").replaceAll("#", "</strong>")}>
            </div>
        </div>
    </>
}