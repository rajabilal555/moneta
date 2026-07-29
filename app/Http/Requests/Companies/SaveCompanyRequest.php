<?php

declare(strict_types=1);

namespace App\Http\Requests\Companies;

use App\Rules\CompanyName;
use App\Support\Money;
use Illuminate\Contracts\Validation\ValidationRule;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

final class SaveCompanyRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'name' => ['required', 'string', 'max:255', new CompanyName],
        ];

        if ($this->isMethod('POST')) {
            $rules['timezone'] = ['required', 'timezone:all'];
            $rules['currency'] = ['required', Rule::in(Money::codes())];
        }

        return $rules;
    }
}
