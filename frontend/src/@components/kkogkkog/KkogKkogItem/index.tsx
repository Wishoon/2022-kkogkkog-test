import { css } from '@emotion/react';
import { MouseEventHandler } from 'react';

import Placeholder from '@/@components/@shared/Placeholder';
import useMe from '@/@hooks/user/useMe';
import { KKOGKKOG_TYPE_MAPPER, THUMBNAIL } from '@/types/client/kkogkkog';
import { KkogKKogResponse } from '@/types/remote/response';

import * as Styled from './style';

type KkogKkogItemProps = KkogKKogResponse & {
  className?: string;
  onClick?: MouseEventHandler<HTMLDivElement>;
};

type KkogKkogItemPreviewProps = Omit<KkogKKogResponse, 'id' | 'couponStatus'> & {
  className?: string;
};

const KkogKkogItem = (props: KkogKkogItemProps) => {
  const { className, onClick, ...kkogkkog } = props;

  const { sender, receiver, backgroundColor, modifier, couponType, thumbnail } = {
    ...kkogkkog,
    thumbnail: THUMBNAIL[kkogkkog.couponType],
  };

  const { me } = useMe();

  return (
    <Styled.Root className={className} hasCursor={!!onClick} onClick={onClick}>
      <Styled.TextContainer>
        {sender.id === me?.id ? (
          <div>To. {receiver.nickname}</div>
        ) : (
          <div>From. {sender.nickname}</div>
        )}
        <div>
          #{modifier} &nbsp;
          <Styled.TypeText>{KKOGKKOG_TYPE_MAPPER[couponType]}</Styled.TypeText>
          &nbsp;꼭꼭
        </div>
      </Styled.TextContainer>
      <Styled.ImageContainer backgroundColor={backgroundColor}>
        <img src={thumbnail} alt='쿠폰' />
      </Styled.ImageContainer>
    </Styled.Root>
  );
};

/* UI에서 보이지 않는 id, ,sender, couponStatus, onClick를 제외한 props만 받는 프로토타입 컴포넌트 */
KkogKkogItem.Preview = function Preview(props: KkogKkogItemPreviewProps) {
  const { className, receiver, backgroundColor, modifier, couponType, thumbnail } = {
    ...props,
    thumbnail: THUMBNAIL[props.couponType],
  };

  return (
    <Styled.Root className={className} hasCursor={false}>
      <Styled.TextContainer>
        <div>To. {receiver?.nickname}</div>
        <div>
          #{modifier} &nbsp;
          <Styled.TypeText>{KKOGKKOG_TYPE_MAPPER[couponType]}</Styled.TypeText>
          &nbsp;꼭꼭
        </div>
      </Styled.TextContainer>
      <Styled.ImageContainer backgroundColor={backgroundColor}>
        <img src={thumbnail} alt='쿠폰' />
      </Styled.ImageContainer>
    </Styled.Root>
  );
};

KkogKkogItem.LinkButton = function LinkButton() {
  return (
    <Styled.Root
      css={css`
        padding: 0;
      `}
    >
      <Styled.LinkButtonContainer>
        <div>+</div>
        <Styled.LinkButtonText>꼭꼭을 생성해보세요 !</Styled.LinkButtonText>
      </Styled.LinkButtonContainer>
    </Styled.Root>
  );
};

KkogKkogItem.Skeleton = function Skeleton() {
  return <Placeholder aspectRatio='3/1' />;
};

export default KkogKkogItem;
