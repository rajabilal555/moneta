import { Form } from '@inertiajs/react';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';
import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { store } from '@/routes/companies';

const SELECT_CLASSES =
    'h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 dark:bg-input/30';

type Props = PropsWithChildren<{
    timezones: string[];
    currencies: { code: string; symbol: string }[];
}>;

export default function CreateCompanyModal({
    children,
    timezones,
    currencies,
}: Props) {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent>
                <Form
                    key={String(open)}
                    {...store.form()}
                    className="space-y-6"
                    onSuccess={() => setOpen(false)}
                >
                    {({ errors, processing }) => (
                        <>
                            <DialogHeader>
                                <DialogTitle>Create a new company</DialogTitle>
                                <DialogDescription>
                                    Set up a company with the timezone and
                                    currency used for wallets, reports, and
                                    dashboards.
                                </DialogDescription>
                            </DialogHeader>

                            <div className="grid gap-2">
                                <Label htmlFor="name">Company name</Label>
                                <Input
                                    id="name"
                                    name="name"
                                    data-test="create-company-name"
                                    placeholder="My company"
                                    required
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="timezone">Timezone</Label>
                                <select
                                    id="timezone"
                                    name="timezone"
                                    defaultValue="Asia/Dhaka"
                                    className={SELECT_CLASSES}
                                >
                                    {timezones.map((timezone) => (
                                        <option key={timezone} value={timezone}>
                                            {timezone.replace(/_/g, ' ')}
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.timezone} />
                            </div>

                            <div className="grid gap-2">
                                <Label htmlFor="currency">Currency</Label>
                                <select
                                    id="currency"
                                    name="currency"
                                    defaultValue="BDT"
                                    className={SELECT_CLASSES}
                                >
                                    {currencies.map((option) => (
                                        <option
                                            key={option.code}
                                            value={option.code}
                                        >
                                            {option.code} ({option.symbol})
                                        </option>
                                    ))}
                                </select>
                                <InputError message={errors.currency} />
                                <p className="text-xs text-muted-foreground">
                                    Default wallets are created in this
                                    currency.
                                </p>
                            </div>

                            <DialogFooter className="gap-2">
                                <DialogClose asChild>
                                    <Button variant="secondary">Cancel</Button>
                                </DialogClose>

                                <Button
                                    type="submit"
                                    data-test="create-company-submit"
                                    disabled={processing}
                                >
                                    Create company
                                </Button>
                            </DialogFooter>
                        </>
                    )}
                </Form>
            </DialogContent>
        </Dialog>
    );
}
