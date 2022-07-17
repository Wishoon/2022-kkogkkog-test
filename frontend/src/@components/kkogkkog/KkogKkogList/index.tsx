import { useState } from 'react';

import KkogKkogItem from '@/@components/kkogkkog/KkogKkogItem';
import { KkogKkog } from '@/types/domain';
import { THUMBNAIL } from '@/utils/constants/kkogkkog';

import KkogKkogModal from '../KkogKkogModal';
import * as Styled from './style';

interface KkogKkogListProps {
  kkogkkogList: KkogKkog[] | undefined;
}

const KkogKkogList = (props: KkogKkogListProps) => {
  const { kkogkkogList } = props;
  const [clickedKkogKkog, setClickedKkogKkog] = useState<KkogKkog | null>(null);

  const handleClickKkogKkog = (kkogkkog: KkogKkog & { thumbnail: string }) => {
    setClickedKkogKkog(kkogkkog);
  };

  const handleCloseModal = () => {
    setClickedKkogKkog(null);
  };

  return (
    <Styled.Root>
      {kkogkkogList?.map(kkogkkog => (
        <KkogKkogItem
          key={kkogkkog.id}
          thumbnail={THUMBNAIL[kkogkkog.couponType]}
          onClick={() =>
            handleClickKkogKkog({ ...kkogkkog, thumbnail: THUMBNAIL[kkogkkog.couponType] })
          }
          {...kkogkkog}
        />
      ))}
      {clickedKkogKkog && (
        <KkogKkogModal clickedKkogKkog={clickedKkogKkog} handleCloseModal={handleCloseModal} />
      )}
    </Styled.Root>
  );
};

export default KkogKkogList;
