import * as S from "./styles";

interface IViewHeader {
  label: string;
  legend: string;
}

const ViewHeader = ({ label, legend }: IViewHeader) => {
  return (
    <S.ViewHeader>
      <h2>{label}</h2>
      <p>{legend}</p>
    </S.ViewHeader>
  );
};

export default ViewHeader;
