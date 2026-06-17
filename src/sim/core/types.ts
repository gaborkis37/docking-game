export type SimulationCommand<
  TType extends string = string,
  TPayload = undefined,
> = Readonly<
  TPayload extends undefined
    ? {
        type: TType;
      }
    : {
        type: TType;
        payload: Readonly<TPayload>;
      }
>;

export type SimulationEvent<
  TType extends string = string,
  TPayload = undefined,
> = Readonly<
  TPayload extends undefined
    ? {
        type: TType;
      }
    : {
        type: TType;
        payload: Readonly<TPayload>;
      }
>;

export type SimulationStep<TState, TCommand> = Readonly<{
  state: Readonly<TState>;
  commands: readonly TCommand[];
  deltaSeconds: number;
}>;

export type SimulationResult<TState, TEvent> = Readonly<{
  state: TState;
  events: readonly TEvent[];
}>;

export type SimulationUpdate<TState, TCommand, TEvent> = (
  step: SimulationStep<TState, TCommand>,
) => SimulationResult<TState, TEvent>;
