import React, { useCallback } from 'react';
import { Form, Input } from 'antd';
import styled from 'styled-components';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/types';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';

const FormWrapper = styled(Form)`
        margin-bottom: 20px;
        border: 1px solid #d9d9d9;
        padding: 20px;
    `;

const NicknameEditForm = () => {
  const { me } = useSelector((state) => state.user);
  const [nickname, onChangeNickname] = useInput(me?.nickname || '');
  const disptach = useDispatch();
  const onSubmit = useCallback(() => {
    disptach({
      type: CHANGE_NICKNAME_REQUEST,
      data: nickname,
    });
  }, [nickname]);
  return (
    <FormWrapper>
      <Input.Search
        value={nickname}
        onChange={onChangeNickname}
        addonBefore="닉네임"
        enterButton="수정"
        onSearch={onSubmit}
      />
    </FormWrapper>
  );
};

export default NicknameEditForm;
