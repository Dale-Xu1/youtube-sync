import React, { Component } from "react"

import type { ChangeEvent, FormEvent, ReactElement } from "react"

import styles from "../../styles/Home.module.css"

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

export default class Form extends Component<Props, State>
{

    public state: State =
    {
        value: ""
    }

    private input = React.createRef<HTMLInputElement>()


    public async focus(): Promise<void>
    {
        await this.delay(100)

        let input = this.input.current!
        input.focus()
    }

    private delay(time: number): Promise<void> // I had no reason to do this but I did it anyways
    {
        return new Promise(promise)
        function promise(resolve: () => void): void
        {
            setTimeout(resolve, time)
        }
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


    public render(): ReactElement
    {
        return (
            <form className={styles.form} onSubmit={this.onSubmit.bind(this)}>
                <span>{this.props.title}</span>
                <div className={styles["form-content"]}>
                    <input
                        type="text"
                        placeholder={this.props.placeholder}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                        ref={this.input}
                    />
                    <button type="submit">
                        <i className={styles.arrow} />
                    </button>
                </div>
            </form>
        )
    }

}
