import styles from "./Menu.module.css";

const MenuBtn = ({
  handleTabClick,
  activeTab,
  link,
  index,
}: {
  handleTabClick: (index: number) => void;
  activeTab: number;
  index: number;
  link: {
    icon: React.ReactNode;
    name: string;
  };
}) => {
  return (
    <button
      className={
        activeTab === index ? `${styles.btn} ${styles.active}` : styles.btn
      }
      onClick={() => handleTabClick(index)}
    >
      {link.icon}
      {link.name}
    </button>
  );
};

export default MenuBtn;
