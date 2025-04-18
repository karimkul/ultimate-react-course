import { getBookedDatesByCabinId, getCabin } from "@/app/_lib/data-service";

export async function GET(request, { params }) {
    const { cabinId } = params;

    try {
        const [cabin, bookedDates] = await Promise.all([
            getCabin(cabinId),
            getBookedDatesByCabinId(cabinId)
        ]);

        return Response.json({ cabin, bookedDates });
    } catch (err) {
        Response.json({ message: "Cabin not found" });
        console.log(err);
    }
}

// export async function POST() {}
