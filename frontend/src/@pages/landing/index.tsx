import { css } from '@emotion/react';
import styled from '@emotion/styled';
import { Link, useLocation } from 'react-router-dom';

import Button from '@/@components/@shared/Button';
import PageTemplate from '@/@components/@shared/PageTemplate';
import KkogKkogItem from '@/@components/kkogkkog/KkogKkogItem';
import ReceivedKkogKkog from '@/@components/kkogkkog/ReceivedKkogKkog';
import SentKkogKkog from '@/@components/kkogkkog/SentKkogKkog';
import { useStatus } from '@/@hooks/@common/useStatus';
import { useKkogKkogList } from '@/@hooks/kkogkkog/useKkogKkogList';
import useMe from '@/@hooks/user/useMe';
import { PATH } from '@/Router';

type STATUS_TYPE = 'received' | 'sent';

const LandingPage = () => {
  const { me } = useMe();

  const { state } = useLocation() as { state: { status: STATUS_TYPE } };

  const { kkogkkogList } = useKkogKkogList();

  const { status, changeStatus } = useStatus<STATUS_TYPE>(state?.status ?? 'received');

  if (!me) {
    return (
      <PageTemplate title='꼭꼭'>
        <Styled.UnAuthorizedRoot>
          <Button
            css={css`
              padding: 15px;
            `}
          >
            꼭꼭 시작하기
          </Button>
        </Styled.UnAuthorizedRoot>
      </PageTemplate>
    );
  }

  return (
    <PageTemplate title='꼭꼭'>
      <Styled.Root>
        <Styled.LinkContainer>
          <Link to={PATH.KKOGKKOG_CREATE}>
            <KkogKkogItem.LinkButton />
          </Link>
        </Styled.LinkContainer>
        <Styled.ListContainer>
          <Styled.ListHeaderContainer>
            <Styled.ListHeaderItem
              isSelected={status === 'received'}
              onClick={() => changeStatus('received')}
            >
              받은 쿠폰
            </Styled.ListHeaderItem>
            <Styled.ListHeaderItem
              isSelected={status === 'sent'}
              onClick={() => changeStatus('sent')}
            >
              보낸 쿠폰
            </Styled.ListHeaderItem>
          </Styled.ListHeaderContainer>

          {status === 'received' && <ReceivedKkogKkog kkogkkogList={kkogkkogList?.received} />}
          {status === 'sent' && <SentKkogKkog kkogkkogList={kkogkkogList?.sent} />}
        </Styled.ListContainer>
      </Styled.Root>
    </PageTemplate>
  );
};

LandingPage.Skeleton = function Skeleton() {
  return (
    <PageTemplate title='꼭꼭'>
      <Styled.Root>
        <Styled.LinkContainer>
          <Link to={PATH.KKOGKKOG_CREATE}>
            <KkogKkogItem.LinkButton />
          </Link>
        </Styled.LinkContainer>
        <Styled.ListContainer>
          <Styled.ListHeaderContainer>
            <Styled.ListHeaderItem>받은 쿠폰</Styled.ListHeaderItem>
            <Styled.ListHeaderItem>보낸 쿠폰</Styled.ListHeaderItem>
          </Styled.ListHeaderContainer>
          <KkogKkogItem.Skeleton />
          <KkogKkogItem.Skeleton />
          <KkogKkogItem.Skeleton />
          <KkogKkogItem.Skeleton />
          <KkogKkogItem.Skeleton />
          <KkogKkogItem.Skeleton />
        </Styled.ListContainer>
      </Styled.Root>
    </PageTemplate>
  );
};

export default LandingPage;

export const Styled = {
  UnAuthorizedRoot: styled.div`
    min-height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;

    padding: 20px;
  `,
  Root: styled.div`
    border-radius: 4px;
  `,
  LinkContainer: styled.div`
    padding: 20px;
  `,
  ListContainer: styled.div``,
  ListHeaderContainer: styled.div`
    display: flex;

    padding: 0 20px;

    & > div {
      margin-right: 30px;
    }
  `,
  ListHeaderItem: styled.div<{ isSelected?: boolean }>`
    padding-bottom: 8px;

    font-size: 14px;

    cursor: pointer;

    ${({ theme, isSelected }) => css`
      color: ${theme.colors.primary_400};

      border-bottom: ${isSelected ? `1.5px solid ${theme.colors.primary_400}` : 'none'};
    `}
  `,
};
