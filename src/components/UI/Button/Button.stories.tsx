import { Meta, StoryFn } from '@storybook/react';

import Button, { ButtonProps } from './Button';

import '@/src/styles/globals.scss';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
    size: {
      type: 'string',
      description: 'Размер кнопки',
      defaultValue: 'standart',
      options: ['standart', 'small'],
      control: {
        type: 'radio'
      }
    },
    type: {
      type: 'string',
      description: 'Вид кнопки',
      defaultValue: 'default',
      options: ['default', 'outline', 'link'],
      control: {
        type: 'radio'
      }
    },
    disabled: {
      type: 'boolean',
      description: 'Отключить кнопку',
      defaultValue: false,
      options: [true, false]
    }
  }
} as Meta;
const Template: StoryFn<ButtonProps> = (args) => <Button {...args} />;
export const Default = Template.bind({});
Default.args = {
  children: 'Обычная кнопка',
  size: 'standart',
  type: 'default'
};
export const Outline = Template.bind({});
Outline.args = {
  children: 'Пустая кнопка',
  size: 'standart',
  type: 'outline'
};
export const Small = Template.bind({});
Small.args = {
  children: 'Маленькая кнопка',
  size: 'small',
  type: 'default'
};
export const Disabled = Template.bind({});
Disabled.args = {
  children: 'Отключенная кнопка',
  size: 'standart',
  type: 'default',
  disabled: true
};
