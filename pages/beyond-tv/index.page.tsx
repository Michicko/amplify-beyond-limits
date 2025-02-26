import GuestLayout from "@/components/GuestLayout/GuestLayout";
import ArticleLayout from "@/components/Layouts/ArticleLayout";
import VideoCards from "@/components/VideoCard/VideoCards";
import { IHighlight } from "@/lib/definitions";
import { match_highlights } from "@/lib/placeholder-data";
import { ReactElement } from "react";

const BeyondTv = ({ highlights }: { highlights: IHighlight[] }) => {
    const links = [{name: 'Academy news', href: '/news'}, {name: 'Beyond limits tv', href: '/beyond-tv'}]

  return (
    <ArticleLayout bg="trans" theme="theme-1" links={links}>
      <div className="main-container">
        <VideoCards videos={highlights}/>
        {/* pagination */}
      </div>
    </ArticleLayout>
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
