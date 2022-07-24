import { useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';

import ListFilter from '@/@components/@shared/ListFilter';
import KkogKkogList from '@/@components/kkogkkog/KkogKkogList';
import { useStatus } from '@/@hooks/@common/useStatus';
import { useChangeKkogKkogStatus } from '@/@hooks/kkogkkog/useChangeKkogKkogStatus';
import { KkogKKogResponse } from '@/types/remote/response';

import KkogKkogModal from '../KkogKkogModal';
import * as Styled from './style';

const filterOption = ['요청', '승인', '대기', '사용'] as const;

const translateKorean = {
  요청: 'REQUESTED',
  승인: 'ACCEPTED',
  대기: 'READY',
  사용: 'FINISHED',
} as const;

interface SentKkogKkogProps {
  kkogkkogList: KkogKKogResponse[] | undefined;
}

export type SentKkogKkogFilterOptionType = typeof filterOption[number];

const SentKkogKkog = (props: SentKkogKkogProps) => {
  const { kkogkkogList } = props;

  const { state } = useLocation() as { state: { action: string } };

  const [clickedCoupon, setClickedCoupon] = useState<KkogKKogResponse | null>(null);

  const { status, changeStatus } = useStatus<SentKkogKkogFilterOptionType>(
    state?.action === 'create' ? '대기' : '요청'
  );

  const changeKkogKkogStatusMutation = useChangeKkogKkogStatus();

  const onClickCoupon = (kkogkkog: KkogKKogResponse) => {
    setClickedCoupon(kkogkkog);
  };

  const closeModal = () => {
    setClickedCoupon(null);
  };

  const onClickFilterButton = (status: SentKkogKkogFilterOptionType) => {
    changeStatus(status);
  };

  const parsedKkogKkogList = useMemo(
    () =>
      kkogkkogList?.reduce(
        (prev, kkogkkog) => {
          const key = kkogkkog.couponStatus;

          return { ...prev, [key]: [...prev[key], kkogkkog] };
        },
        {
          REQUESTED: [],
          READY: [],
          ACCEPTED: [],
          FINISHED: [],
        } as any
      ),
    [kkogkkogList]
  );

  const statusData: Record<
    string,
    {
      description: string;
      modalTitle: string;
      modalButtons?: { text: string; onClick: (args: { id: number; message?: string }) => void }[];
    }
  > = {
    REQUESTED: {
      description: '사용 요청이 온',
      modalTitle: '쿠폰 사용 요청을 승인하시겠어요?',
      modalButtons: [
        {
          text: '거절',
          onClick({ id, message }) {
            changeKkogKkogStatusMutation.mutate({ id, body: { couponEvent: 'DECLINE', message } });
          },
        },
        {
          text: '승인',
          onClick({ id, message }) {
            changeKkogKkogStatusMutation.mutate({ id, body: { couponEvent: 'ACCEPT', message } });
          },
        },
      ],
    },
    // 현재 Sender는 쿠폰 사용을 요청할 수 없다.
    READY: {
      description: '사용을 기다리는',
      modalTitle: '보낸 쿠폰입니다.',
    },
    ACCEPTED: {
      description: '사용 승인한',
      modalTitle: '쿠폰 사용하셨나요??',
      modalButtons: [
        {
          text: '사용 완료',
          onClick({ id, message }) {
            console.log('사용 완료!');
            // changeKkogKkogStatusMutation.mutate({ id, body: { couponEvent: 'FINISH', message } });
          },
        },
      ],
    },
    FINISHED: {
      description: '사용된',
      modalTitle: '이미 사용한 쿠폰입니다.',
    },
  };

  return (
    <Styled.Root>
      <ListFilter<SentKkogKkogFilterOptionType>
        status={status}
        onClickFilterButton={onClickFilterButton}
        options={filterOption}
      />
      <Styled.ListContainer>
        <div>{statusData[translateKorean[status]].description} 꼭꼭</div>
        <KkogKkogList
          kkogkkogList={parsedKkogKkogList[translateKorean[status]]}
          onClickCoupon={onClickCoupon}
        />
      </Styled.ListContainer>
      {clickedCoupon && (
        <KkogKkogModal
          kkogkkog={clickedCoupon}
          closeModal={closeModal}
          modalTitle={statusData[clickedCoupon.couponStatus].modalTitle}
          modalButtons={statusData[clickedCoupon.couponStatus].modalButtons}
        />
      )}
    </Styled.Root>
  );
};

export default SentKkogKkog;

SentKkogKkog.Skeleton = function Skeleton() {
  return (
    <Styled.Root>
      <ListFilter.Skeleton />
      <KkogKkogList.Skeleton />
    </Styled.Root>
  );
};
