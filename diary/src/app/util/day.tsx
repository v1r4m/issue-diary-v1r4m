import { GetServerSideProps } from "next";

export type DayProps = {
  year: number;
  month: number;
  date: number;
};

export const getServerSideProps: GetServerSideProps<DayProps> = async () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();

  return {
    props: {
      year,
      month,
      date,
    },
  };
};