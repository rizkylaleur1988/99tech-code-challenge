import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { PaginationType } from "../types/datagrid.type.js";
import { NODE_ENV } from "../config/env.config.js";
import { EnvironmentEnum } from "../enums/environment.enum.js";

/*
 * Author Mochamad Rizki <rizkylaleur1988@gmail.com>
 * Copyright (c) 2026
 */

export class ApiResponse {
  private code: number = StatusCodes.INTERNAL_SERVER_ERROR;
  private description: string = getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);
  private wrapperData: string = "data";
  private data: object | undefined = undefined;
  private wrapper: string = "response";
  private stack: unknown = undefined;
  private error: unknown = undefined;
  private keyCode: string = "code";
  private keyMessage: string = "message";
  private withWrapper: boolean = false;
  private pagination: PaginationType | undefined = undefined;

  /**
   * Sets the HTTP status code.
   *
   * @param {number} code
   * @returns {this}
   */
  setCode(code: number): this {
    this.code = code;
    return this;
  }

  /**
   * Gets the HTTP status code.
   *
   * @returns {number}
   */
  getCode(): number {
    return this.code;
  }

  /**
   * Sets the status description.
   *
   * @param {string} description
   * @returns {this}
   */
  setDescription(description: string): this {
    this.description = description;
    return this;
  }

  /**
   * Gets the status description.
   *
   * @returns {string}
   */
  getDescription(): string {
    return this.description;
  }

  /**
   * Sets the response data payload.
   *
   * @param {(object | undefined)} data
   * @returns {this}
   */
  setData(data: object | undefined): this {
    this.data = data;
    return this;
  }

  /**
   * Gets the response data payload.
   *
   * @returns {(object | undefined)}
   */
  getData(): object | undefined {
    return this.data;
  }

  /**
   * Sets the key name for the data wrapper.
   *
   * @param {string} wrapperData
   * @returns {this}
   */
  setWrapperData(wrapperData: string): this {
    this.wrapperData = wrapperData;
    return this;
  }

  /**
   * Gets the key name for the data wrapper.
   *
   * @returns {string}
   */
  getWrapperData(): string {
    return this.wrapperData;
  }

  /**
   * Sets the main wrapper key name.
   *
   * @param {string} wrapper
   * @returns {this}
   */
  setWrapper(wrapper: string): this {
    this.wrapper = wrapper;
    return this;
  }

  /**
   * Gets the main wrapper key name.
   *
   * @returns {string}
   */
  getWrapper(): string {
    return this.wrapper;
  }

  /**
   * Sets the stack trace information for the current instance.
   *
   * @param {unknown} stack
   * @returns {this}
   */
  setStack(stack: unknown): this {
    this.stack = stack;
    return this;
  }

  /**
   * Retrieves the stored stack trace value.
   *
   * @returns {unknown}
   */
  getStack(): unknown {
    return this.stack;
  }

  /**
   * Sets the error information for the current instance.
   *
   * @param {unknown} error
   * @returns {this}
   */
  setError(error: unknown): this {
    this.error = error;
    return this;
  }

  /**
   * Retrieves the stored error value.
   *
   * @returns {unknown}
   */
  getError(): unknown {
    return this.error;
  }

  /**
   * Sets the value of keyCode.
   *
   * @param {string} keyCode
   * @returns {this}
   */
  setKeyCode(keyCode: string): this {
    this.keyCode = keyCode;
    return this;
  }

  /**
   * Retrieves the current value of keyCode.
   *
   * @returns {string}
   */
  getKeyCode(): string {
    return this.keyCode;
  }

  /**
   * Sets the value of keyMessage.
   *
   * @param {string} keyMessage
   * @returns {this}
   */
  setKeyMessage(keyMessage: string): this {
    this.keyMessage = keyMessage;
    return this;
  }

  /**
   * Retrieves the current value of keyMessage.
   *
   * @returns {string}
   */
  getKeyMessage(): string {
    return this.keyMessage;
  }

  /**
   * Sets the withWrapper flag.
   *
   * @param {boolean} withWrapper
   * @returns {this}
   */
  setWithWrapper(withWrapper: boolean): this {
    this.withWrapper = withWrapper;
    return this;
  }

  /**
   * Returns the current value of the withWrapper flag.
   *
   * @returns {boolean}
   */
  getWithWrapper(): boolean {
    return this.withWrapper;
  }

  /**
   * Sets the pagination.
   *
   * @param {PaginationType} pagination
   * @returns {this}
   */
  setPagination(pagination: PaginationType): this {
    this.pagination = pagination;
    return this;
  }

  /**
   * Returns the current value of the pagination.
   *
   * @returns {(PaginationType | undefined)}
   */
  getPagination(): PaginationType | undefined {
    return this.pagination;
  }

  /**
   * Builds the final response object.
   *
   * @returns {object}
   */
  response(): object {
    const baseResponse = {
      [this.getKeyCode()]: this.getCode(),
      [this.getKeyMessage()]: this.getDescription(),
      [this.getWrapperData()]: this.getData(),
      ...(this.getPagination() ? { pagination: this.getPagination() } : undefined),
      ...(NODE_ENV !== EnvironmentEnum.production && {
        stack: this.getStack(),
        error: this.getError(),
      }),
    };
    return this.withWrapper ? { [this.getWrapper()]: baseResponse } : baseResponse;
  }
}
