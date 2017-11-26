interface Entity {
    Transformation : Transformation;

    update(delta: number): void;
    draw(): void;
}