package com.woowacourse.kkogkkog.domain;

import com.woowacourse.kkogkkog.exception.InvalidRequestException;

public enum CouponStatus {

    READY,
    REQUESTED,
    ;

    public CouponStatus handle(CouponEvent event) {
        if (event == CouponEvent.REQUEST) {
            return handleRequest();
        }
        throw new InvalidRequestException("처리할 수 없는 요청입니다.");
    }

    private CouponStatus handleRequest() {
        if (this != READY) {
            throw new InvalidRequestException("사용 요청을 보낼 수 없는 상태의 쿠폰입니다.");
        }
        return REQUESTED;
    }
}
