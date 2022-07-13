package com.woowacourse.kkogkkog.domain;

import com.woowacourse.kkogkkog.exception.coupon.CouponTypeNotFoundException;
import java.util.Arrays;
import lombok.Getter;

// TODO: delete value field
@Getter
public enum CouponType {

    COFFEE("커피"),
    MEAL("식사");

    private final String value;

    CouponType(String value) {
        this.value = value;
    }

    public static CouponType of(String input) {
        return Arrays.stream(CouponType.values())
                .filter(it -> it.value.equals(input))
                .findAny()
                .orElseThrow(CouponTypeNotFoundException::new);
    }
}
