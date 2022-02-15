import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { waitForElementToBeRemoved } from '@testing-library/dom'

import SummaryForm from '../SummaryForm'

test('checkbox enables button', () => {
  render(<SummaryForm />)
  const checkbox = screen.getByRole('checkbox', { name: /terms and conditions/i })
  const confirmButton = screen.getByRole('button', { name: /confirm order/i })

  // Checkbox is unchecked by default
  expect(checkbox).not.toBeChecked()
  expect(confirmButton).toBeDisabled()

  // Checking checkbox enables confirmButton
  userEvent.click(checkbox)
  expect(checkbox).toBeChecked()
  expect(confirmButton).toBeEnabled()

  // Unchecking checkbox disables confirmButton
  userEvent.click(checkbox)
  expect(checkbox).not.toBeChecked()
  expect(confirmButton).toBeDisabled()
})

test('popover responds to hover', async () => {
  render(<SummaryForm />)

  // popover starts hidden
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i)
  expect(nullPopover).not.toBeInTheDocument()

  // popover shows on mouseover of checkbox label
  const termsAndConditions = screen.getByText(/terms and conditions/i)
  userEvent.hover(termsAndConditions)

  const popover = screen.getByText(/no ice cream will actually be delivered/i)
  expect(popover).toBeInTheDocument()

  // popover returns to being hidden on mouseout
  userEvent.unhover(termsAndConditions)
  await waitForElementToBeRemoved(() => screen.queryByText(/no ice cream will actually be delivered/i))
  // expect(nullPopoverAgain).not.toBeInTheDocument()
})
