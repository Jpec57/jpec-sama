import dayjs from "dayjs";
import debugAndThrowError from "../debugAndThrowError";
import supabaseAdmin from "../supabaseAdmin";

const getFlashcardsPerInterval = async (
  userId: string,
  startDate: string,
  endDate: string,
  hourStep = 1,
): Promise<
  {
    date: string;
    count: number;
  }[]
> => {
  const query = supabaseAdmin.from("flashcard").select("id, next_available_at");
  const { data, error } = await query
    .gte("next_available_at", startDate)
    .lte("next_available_at", endDate)
    .eq("user_id", userId)
    .order("next_available_at", { ascending: true });
  debugAndThrowError(error);

  if ((data?.length ?? 0) === 0) {
    return [];
  }
  const res: {
    date: string;
    count: number;
  }[] = [];
  let tmpStartDate = dayjs(startDate);
  let tmpEndDate = dayjs(startDate).add(hourStep, "hour");

  let isFirst = true;
  while (tmpEndDate.isBefore(dayjs(endDate))) {
    const flashcardsPerInterval = data!.filter((flashcard) => {
      const timestamp = dayjs(flashcard.next_available_at).unix();
      return (
        isFirst ||
        (timestamp >= tmpStartDate.unix() && timestamp < tmpEndDate.unix())
      );
    });
    res.push({
      date: tmpStartDate.toISOString(),
      count: flashcardsPerInterval.length,
    });
    tmpStartDate = tmpEndDate;
    tmpEndDate = tmpEndDate.add(hourStep, "hour");
    isFirst = false;
  }
  console.dir(res, { depth: null });
  return res;
};

export default getFlashcardsPerInterval;
