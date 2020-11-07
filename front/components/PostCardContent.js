import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

const { TextArea } = Input;
const PostCardContent = ({ postData, editMode, onCancelUpdate, onClickUpdate }) => {
  const { updatePostLoading, updatePostDone } = useSelector((state) => state.post);
  const [editText, setEditText] = useState(postData);
  const onChangeText = useCallback((e) => {
    setEditText(e.target.value);
  });

  useEffect(() => {
    if (updatePostDone) {
      onCancelUpdate();
    }
  }, [updatePostDone]);

  return (
    <div>
      {editMode
        ? (
          <>
            <TextArea value={editText} onChange={onChangeText} />
            <Button.Group>
              <Button onClick={onClickUpdate(editText)} loading={updatePostLoading}>수정</Button>
              <Button type="danger" onClick={onCancelUpdate}>취소</Button>
            </Button.Group>
          </>
        )
        : postData.split(/(#[^\s#]+)/g).map((v, i) => {
          if (v.match(/(#[^\s#]+)/g)) {
            return <Link href={`/hashtag/${v.slice(1)}`} key={i}><a>{v}</a></Link>;
          }
          return v;
        })}
    </div>
  );
};

PostCardContent.propTypes = {
  postData: PropTypes.string.isRequired,
  editMode: PropTypes.bool,
  onCancelUpdate: PropTypes.bool.isRequired,
  onClickUpdate: PropTypes.func.isRequired,
};

PostCardContent.defaultProps = {
  editMode: false,
};

export default PostCardContent;
