import { useParams } from "solid-app-router"
import { createResource, Show, createSignal } from "solid-js";
import AvailableItems from "../AvailableItems";
import MainItemDetails from "../MainItemDetails";
import SoldItems from "../SoldItems";
import { SolidApexCharts } from 'solid-apexcharts';

export default function ItemPage() {

    const params = useParams();

    const [options, setOptions] = createSignal({
        series: [{
            data: []
        }],
        xaxis: {
            labels: {
                style: {
                    colors: "white"
                }
            }
        }
    });

    const [itemResource] = createResource(() => params.id, async (itemId) => {
        return fetch(`http://localhost/api/v1/item/${itemId}`).then(d => d.json());
    });

    const [chartResource] = createResource(() => params.id, async (itemId) => {
        let res = await fetch(`http://localhost/api/v1/item/${itemId}/candle`).then(d => d.json());

        let data = [];
        res.forEach(element => {
            data.push({x: element.ts, y: [element.O, element.H, element.L, element.C]})
        });

        console.log(data);

        setOptions({
            series: [{
                data: data
            }]
        })

    });

    return <>
        <div class="container mx-auto">
            <div class="grid md:grid-cols-[70%_30%] grid-cols-1 w-full h-64">
                <div>
                    <div>
                    <SolidApexCharts width="100%" height="350px" type="candlestick" options={options()} />
                    </div>    
                    <div class="m-5">
                        <div class="text-2xl pb-5 font-bold">Currently Available</div>
                        <AvailableItems />
                    </div>
                </div>
                <div class="text-center font-bold mt-5">
                    <Show when={itemResource()}>
                        <MainItemDetails data={itemResource()} />
                    </Show>
                    <SoldItems />
                </div>
            </div>
        </div>
    </>

}