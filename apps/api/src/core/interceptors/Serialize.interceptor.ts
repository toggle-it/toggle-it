import {
  CallHandler,
  ExecutionContext,
  NestInterceptor,
  UseInterceptors,
} from "@nestjs/common";
import { ClassConstructor, plainToClass } from "class-transformer";
import { map } from "rxjs/operators";

class SerializeInterceptor implements NestInterceptor {
  constructor(private readonly dto: ClassConstructor<unknown>) {}

  intercept(context: ExecutionContext, next: CallHandler) {
    return next.handle().pipe(
      map((data) =>
        plainToClass(this.dto, data, {
          excludeExtraneousValues: true,
        })
      )
    );
  }
}

export function Serialize(dto: ClassConstructor<unknown>) {
  return UseInterceptors(new SerializeInterceptor(dto));
}
