import React, { useCallback } from 'react';
import clsx from 'clsx';

import { useChatContext } from '../../context/ChatContext';

export const Item = React.forwardRef(function Item(props, innerRef) {
  const {
    className,
    component: Component,
    item,
    onClickHandler,
    onSelectHandler,
    selected,
    style,
  } = props;

  const { themeVersion } = useChatContext('SuggestionItem');

  const handleSelect = useCallback(() => onSelectHandler(item), [item, onSelectHandler]);
  const handleClick = useCallback((event) => onClickHandler(event, item), [item, onClickHandler]);

  if (themeVersion === '2')
    return (
      <li
        className={clsx(className, { 'str-chat__suggestion-item--selected': selected })}
        style={style}
      >
        <a
          href=''
          onClick={handleClick}
          onFocus={handleSelect}
          onMouseEnter={handleSelect}
          ref={innerRef}
        >
          <Component entity={item} selected={selected} />
        </a>
      </li>
    );

  return (
    <li className={clsx('rta__item', className)} style={style}>
      <button
        className={clsx('rta__entity', { 'rta__entity--selected': selected })}
        onClick={handleClick}
        onFocus={handleSelect}
        onMouseEnter={handleSelect}
        ref={innerRef}
      >
        <div tabIndex={-1}>
          <Component entity={item} selected={selected} />
        </div>
      </button>
    </li>
  );
});
