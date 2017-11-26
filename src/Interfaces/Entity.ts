interface Entity {
    transformation: Transformation;

    update(delta: number): void;
    draw(): void;
}