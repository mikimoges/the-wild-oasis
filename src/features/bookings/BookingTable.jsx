import BookingRow from "./BookingRow";
import Table from "../../ui/Table";
import Menus from "../../ui/Menus";
import { useQuery } from "@tanstack/react-query";
import { getBookings } from "../../services/apiBookings";
import Spinner from "../../ui/Spinner";
import { useSearchParams } from "react-router-dom";
import Pagination from "../../ui/Pagination";
import { useBookings } from "./useBookings";
import Empty from "../../ui/Empty";

function BookingTable() {
  // const [searchParams] = useSearchParams();

  // const filterValue = searchParams.get("status");
  // const filter =
  //   !filterValue || filterValue === "all"
  //     ? null
  //     : { field: "status", value: filterValue, method: "eq" };
  // const sortByRaw = searchParams.get("sortBy") || "startDate-desc";
  // const [field, direction] = sortByRaw.split("-");
  // const sortBy = { field, direction };

  // const {
  //   data: { data: bookings, count },
  //   error,
  //   isLoading,
  // } = useQuery({
  //   queryKey: ["bookings", filter, sortBy],
  //   queryFn: () => getBookings({ filter, sortBy }),
  // });
  // const bookings = data;
  const { isLoading, bookings, error, count } = useBookings();
  if (isLoading) return <Spinner />;
  if (!bookings.length) return <Empty resource="bookings" />;
  return (
    <Menus>
      <Table columns="0.6fr 2fr 2.4fr 1.4fr 1fr 3.2rem">
        <Table.Header>
          <div>Cabin</div>
          <div>Guest</div>
          <div>Dates</div>
          <div>Status</div>
          <div>Amount</div>
          <div></div>
        </Table.Header>

        <Table.Body
          data={bookings}
          render={(booking) => (
            <BookingRow key={booking.id} booking={booking} />
          )}
        />
        <Table.Footer>
          <Pagination count={count} />
        </Table.Footer>
      </Table>
    </Menus>
  );
}

export default BookingTable;
