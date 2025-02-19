import { ISocial } from "@/lib/definitions";
import Image from "next/image";

const Social = ({ social }: { social: ISocial }) => {
  return (
    <a href={social.link} target="_blank">
      <Image src={social.icon} alt={social.name} width={30} height={30} />
    </a>
  );
};

export default Social;
