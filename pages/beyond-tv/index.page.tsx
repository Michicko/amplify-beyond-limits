import GuestLayout from "@/components/GuestLayout/GuestLayout";
import PageHeader from "@/components/PageHeader/PageHeader";
import PageTitle from "@/components/PageHeader/PageTitle";
import VideoCard from "@/components/VideoCard/VideoCard";
import { IHighlight } from "@/lib/definitions";
import { match_highlights } from "@/lib/placeholder-data";
import { ReactElement } from "react";

const BeyondTv = ({ highlights }: { highlights: IHighlight[] }) => {
  return (
    <>
      <PageHeader
        title={"Beyond Limits Tv"}
        lead={"Watch our highlights"}
        image={"/images/beyondtv.jpg"}
      />
      <PageTitle text={"Highlights"} />
      <div className="main-container">
        <div className="highlights">
          {highlights.map((highlight) => {
            return <VideoCard highlight={highlight} key={highlight.id} />;
          })}
        </div>
        {/* pagination */}
      </div>
    </>
  );
};

BeyondTv.getLayout = function getLayout(page: ReactElement) {
  return <GuestLayout>{page}</GuestLayout>;
};

// Sample data fetching
export async function getServerSideProps() {
  const res_highlights = match_highlights;

  return { props: { highlights: res_highlights } };
}

export default BeyondTv;
