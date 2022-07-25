import KkogKkogItem from '@/@components/kkogkkog/KkogKkogItem';
import { KkogKKogResponse } from '@/types/remote/response';

import * as Styled from './style';

interface KkogKkogListProps {
  kkogkkogList?: KkogKKogResponse[];
  onClickCouponItem?: (kkogkkog: KkogKKogResponse) => void;
}

// onClickCouponItem -> 이 함수에는 항상 kkogkkog을 보내줄거고 이런 함수만 와야해!
// 이 컴포넌트가 다양한 기능을 수행할 수 있다고 볼 순 없겠다.
const KkogKkogList = (props: KkogKkogListProps) => {
  const { kkogkkogList, onClickCouponItem } = props;

  if (kkogkkogList?.length === 0) {
    return (
      <Styled.Root>
        <Styled.TextContainer fontSize='40px'>😱</Styled.TextContainer>
        <Styled.TextContainer>해당 꼭꼭이 존재하지 않아요 ㅠㅠ</Styled.TextContainer>
      </Styled.Root>
    );
  }

  return (
    <Styled.Root>
      {kkogkkogList?.map(kkogkkog => (
        <KkogKkogItem key={kkogkkog.id} onClick={()=>onClickCouponItem(kkogkkog)} {...kkogkkog} />
      ))}
    </Styled.Root>
  );
};

export default KkogKkogList;

KkogKkogList.Skeleton = function Skeleton() {
  return (
    <Styled.Root>
      <KkogKkogItem.Skeleton />
      <KkogKkogItem.Skeleton />
      <KkogKkogItem.Skeleton />
      <KkogKkogItem.Skeleton />
    </Styled.Root>
  );
};
