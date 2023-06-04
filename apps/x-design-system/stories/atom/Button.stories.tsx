import type { Meta, StoryObj } from "@storybook/react";
import { userEvent, within } from "@storybook/testing-library";
import { Button } from "@ti/ui";

const meta: Meta<typeof Button> = {
  component: Button,
  tags: ["autodocs"],
  args: {
    variant: "primary",
    size: "md",
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const submitButton = canvas.getByRole("button");

    await userEvent.click(submitButton);
  },
};

export default meta;

type Story = StoryObj<typeof Button>;

export const Default: Story = {
  render: (args) => <Button {...args}>Button</Button>,
};

export const Primary: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="primary" size="sm">
        Button
      </Button>
      <Button variant="primary" size="md">
        Button
      </Button>
      <Button variant="primary" size="lg">
        Button
      </Button>
    </div>
  ),
};

export const Secondary: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="secondary" size="sm">
        Button
      </Button>
      <Button variant="secondary" size="md">
        Button
      </Button>
      <Button variant="secondary" size="lg">
        Button
      </Button>
    </div>
  ),
};

export const destructive: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="destructive" size="sm">
        Button
      </Button>
      <Button variant="destructive" size="md">
        Button
      </Button>
      <Button variant="destructive" size="lg">
        Button
      </Button>
    </div>
  ),
};

export const outline: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="outline" size="sm">
        Button
      </Button>
      <Button variant="outline" size="md">
        Button
      </Button>
      <Button variant="outline" size="lg">
        Button
      </Button>
    </div>
  ),
};

export const ghost: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="ghost" size="sm">
        Button
      </Button>
      <Button variant="ghost" size="md">
        Button
      </Button>
      <Button variant="ghost" size="lg">
        Button
      </Button>
    </div>
  ),
};

export const link: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Button variant="link" size="sm">
        Button
      </Button>
      <Button variant="link" size="md">
        Button
      </Button>
      <Button variant="link" size="lg">
        Button
      </Button>
    </div>
  ),
};
