interface Entity {
    Transformation : Transformation;

    Update(delta: number): void;
    Draw(): void;
}