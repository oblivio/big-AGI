import * as React from 'react';

import { Box, Divider, ListDivider, listItemButtonClasses, ListItemDecorator, Option, optionClasses, Select } from '@mui/joy';
import { SxProps } from '@mui/joy/styles/types';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export type DropdownItems = Record<string, {
  title: string,
  symbol?: string,
  type?: 'separator'
  icon?: React.ReactNode,
}>;


export const PageBarDropdownMemo = React.memo(PageBarDropdown);

/**
 * A Select component that blends-in nicely (cleaner, easier to the eyes)
 */
function PageBarDropdown<TValue extends string>(props: {
  items: DropdownItems,
  prependOption?: React.JSX.Element,
  appendOption?: React.JSX.Element,
  value: TValue | null,
  onChange: (value: TValue | null) => void,
  placeholder?: string,
  showSymbols?: boolean,
  sx?: SxProps
}) {

  const { onChange } = props;

  const handleOnChange = React.useCallback((_event: any, value: TValue | null) => {
    onChange(value);
  }, [onChange]);

  return <Select
    variant='plain'
    value={props.value}
    onChange={handleOnChange}
    placeholder={props.placeholder}
    indicator={<KeyboardArrowDownIcon />}
    slotProps={{
      root: {
        sx: {
          backgroundColor: 'transparent',
          maxWidth: 'calc(100dvw - 100px)',
        },
      },
      indicator: {
        sx: {
          color: 'rgba(255,255,255, 0.5)',
        },
      },
      listbox: {
        variant: 'outlined',
        sx: {
          // these 3 are copied from JoyMenuList.root - to simulate the same appearance
          '--Icon-fontSize': 'var(--joy-fontSize-xl2)',
          '--ListItem-minHeight': '3rem',
          // do not exceed the height of the screen (minus top bar) with any listbox menu
          maxHeight: 'calc(100dvh - 56px - 24px)',
          maxWidth: '90dvw',
          [`& .${optionClasses.root}`]: {
            minWidth: 160,
          },
          [`& .${listItemButtonClasses.root}`]: {
            minWidth: 160,
          },
        },
      },
    }}
    sx={{
      mx: 0,
      fontWeight: 500,
      ...(props.sx || {}),
    }}
  >
    {props.prependOption}
    {!!props.prependOption && Object.keys(props.items).length >= 1 && <Divider />}

    <Box sx={{ overflowY: 'auto' }}>
      {Object.keys(props.items).map((key: string, idx: number) => {
        const item = props.items[key];

        if (item.type === 'separator')
          return <ListDivider key={'key-' + idx} />;

        return (
          <Option key={'key-' + idx} value={key} sx={{ whiteSpace: 'nowrap' }}>
            {props.showSymbols && (!!item.icon
                ? <ListItemDecorator>{item?.icon}</ListItemDecorator>
                : item?.symbol
                  ? <ListItemDecorator sx={{ fontSize: 'xl' }}>{item?.symbol + ' '}</ListItemDecorator>
                  : null
            )}
            {item.title}
            {/*{key === props.value && (*/}
            {/*  <IconButton variant='soft' onClick={() => alert('aa')} sx={{ ml: 'auto' }}>*/}
            {/*    <SettingsIcon color='success' />*/}
            {/*  </IconButton>*/}
            {/*)}*/}
          </Option>
        );
      })}
    </Box>

    {!!props.appendOption && Object.keys(props.items).length >= 1 && <ListDivider />}
    {props.appendOption}
  </Select>;
}