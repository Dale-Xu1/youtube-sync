import React, { ChangeEvent, FormEvent } from "react"

interface Props
{

    title: string
    placeholder: string

    onSubmit(value: string): void

}

interface State
{

    value: string

}

class Form extends React.Component<Props, State>
{

    public state: State =
    {
        value: ""
    }


    private onChange(e: ChangeEvent<HTMLInputElement>): void
    {
        this.setState({ value: e.target.value })
    }

    private onSubmit(e: FormEvent): void
    {
        e.preventDefault()
        this.props.onSubmit(this.state.value)
    }

    public render(): React.ReactElement
    {
        return (
            <form onSubmit={this.onSubmit.bind(this)}>
                <span>{this.props.title}</span>
                <div className="form-content">
                    <input
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                    <button type="submit">
                        <i className="arrow" />
                    </button>
                </div>
            </form>
        )
    }

}

export default Form
